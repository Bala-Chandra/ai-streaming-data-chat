<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-9 col-lg-7">

        <div class="row items-center q-mb-md">
          <div>
            <div class="text-h5">
              AI Data Analyst
            </div>

            <div class="text-caption">
              WebSocket:
              <strong>{{ chat.connectionState }}</strong>
            </div>
          </div>

          <q-space />

          <q-select
            v-model="chat.selectedScenario"
            :options="scenarioOptions"
            emit-value
            map-options
            label="Scenario"
            outlined
            dense
            style="width: 220px"
          />
        </div>

        <q-separator />

        <div class="chat-container q-py-md">

          <div
            v-for="message in chat.messages"
            :key="message.id"
            class="q-mb-md"
          >
            <q-card
              flat
              bordered
              :class="
                message.role === 'user'
                  ? 'user-message'
                  : 'assistant-message'
              "
            >
              <q-card-section>
                <div class="text-caption text-weight-bold q-mb-xs">
                  {{ message.role === 'user' ? 'You' : 'Assistant' }}
                </div>

                <div class="message-content">
                  {{ message.content }}
                </div>
              </q-card-section>
            </q-card>
          </div>

          <q-card
            v-if="chat.isStreaming"
            flat
            bordered
            class="assistant-message q-mb-md"
          >
            <q-card-section>
              <div class="text-caption text-weight-bold q-mb-xs">
                Assistant — streaming
              </div>

              <div class="message-content">
                {{ chat.streamedResponse }}
              </div>

              <q-linear-progress
                indeterminate
                class="q-mt-md"
              />
            </q-card-section>
          </q-card>

        </div>

        <q-separator />

        <div class="row q-gutter-sm q-pt-md">
          <q-input
            v-model="prompt"
            outlined
            class="col"
            placeholder="Ask about the dataset..."
            :disable="chat.isStreaming"
            @keyup.enter="send"
          />

          <q-btn
            color="primary"
            label="Send"
            :disable="
              !prompt.trim() ||
              !chat.isConnected ||
              chat.isStreaming
            "
            @click="send"
          />
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

import { useAiChatStore } from '@/stores/ai-chat.store';

const chat = useAiChatStore();

const prompt = ref('');

const scenarioOptions = [
  {
    label: '1 — Phase 3 compounds',
    value: 1,
  },
  {
    label: '2 — Activity datapoints',
    value: 2,
  },
  {
    label: '3 — Multiple tables',
    value: 3,
  },
];

function send(): void {
  const value = prompt.value.trim();

  if (!value) {
    return;
  }

  chat.sendMessage(value);

  prompt.value = '';
}

onMounted(() => {
  chat.connect();
});

onBeforeUnmount(() => {
  chat.disconnect();
});
</script>

<style scoped>
.chat-container {
  min-height: 500px;
}

.user-message {
  margin-left: auto;
  max-width: 75%;
}

.assistant-message {
  max-width: 90%;
}

.message-content {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
