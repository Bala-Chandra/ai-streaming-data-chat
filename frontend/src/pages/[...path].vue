<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title>
          AI Streaming Data Chat
        </q-toolbar-title>

        <q-badge
          outline
          label="Vue + NestJS WebSocket"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// Keep the layout intentionally simple for the initial setup.
// Application logic belongs in pages, stores, and services.
</script>
