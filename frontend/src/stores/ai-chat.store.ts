import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { aiSocketService } from '@/services/ai-socket.service';

import type {
  AiChunkEvent,
  AiCompleteEvent,
  AiStartedEvent,
  ChatMessage,
  ConnectionState,
} from '@/types/ai-chat';

export const useAiChatStore = defineStore('ai-chat', () => {
  const messages = ref<ChatMessage[]>([]);

  const streamedResponse = ref('');

  const activeRequestId = ref<string | null>(null);

  const connectionState =
    ref<ConnectionState>('disconnected');

  const isStreaming = ref(false);

  const selectedScenario = ref(1);

  const isConnected = computed(
    () => connectionState.value === 'connected',
  );

  function connect(): void {
    connectionState.value = 'connecting';

    aiSocketService.connect({
      onConnect() {
        connectionState.value = 'connected';
      },

      onDisconnect() {
        connectionState.value = 'disconnected';
      },

      onStarted(event: AiStartedEvent) {
        activeRequestId.value = event.requestId;
        streamedResponse.value = '';
        isStreaming.value = true;
      },

      onChunk(event: AiChunkEvent) {
        if (event.requestId !== activeRequestId.value) {
          return;
        }

        streamedResponse.value += event.content;
      },

      onComplete(event: AiCompleteEvent) {
        if (event.requestId !== activeRequestId.value) {
          return;
        }

        messages.value.push({
          id: event.requestId,
          role: 'assistant',
          content: streamedResponse.value,
        });

        streamedResponse.value = '';
        activeRequestId.value = null;
        isStreaming.value = false;
      },
    });
  }

  function sendMessage(prompt: string): void {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isStreaming.value) {
      return;
    }

    messages.value.push({
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedPrompt,
    });

    streamedResponse.value = '';
    isStreaming.value = true;

    try {
      aiSocketService.sendQuery(
        trimmedPrompt,
        selectedScenario.value,
      );
    } catch (error) {
      isStreaming.value = false;
      throw error;
    }
  }

  function disconnect(): void {
    aiSocketService.disconnect();

    connectionState.value = 'disconnected';
  }

  return {
    messages,
    streamedResponse,
    activeRequestId,
    connectionState,
    isStreaming,
    selectedScenario,
    isConnected,

    connect,
    disconnect,
    sendMessage,
  };
});
