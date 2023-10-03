<template>
  <div class="flex items-center">
    <h1 class="q-mr-sm">{{ $t('todoToday.title') }}</h1>
    <q-btn round color="purple" icon="add" @click="() => showModal = true" />

    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section>
          <h3>Nova Task</h3>
        </q-card-section>

        <q-card-section>
          <form-component></form-component>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormComponent from 'components/TodoToday/FormComponent.vue'

const showModal = ref(false);
</script>