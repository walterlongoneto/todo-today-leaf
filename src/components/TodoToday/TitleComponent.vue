<template>
  <div class="flex items-center">
    <h1 class="q-mr-sm">{{ $t('todoToday.title') }}</h1>
    <q-btn round color="purple" icon="add" @click="onAddClick" />

    <q-dialog v-model="showModal">
      <q-card style="width: 500px">
        <q-card-section>
          <h3>Nova Task</h3>
        </q-card-section>

        <q-card-section>
          <form-component :task="task" @submit="onSubmit"></form-component>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import FormComponent from 'components/TodoToday/FormComponent.vue';
import { Task } from 'components/models';
import { useTaskStore } from 'src/stores/task-store';
import { ref } from 'vue';

const taskStore = useTaskStore()

const showModal = ref<boolean>(false)
const task = ref<Task>(taskStore.buildTask())

const clearTask = () => {
  task.value = taskStore.buildTask()
}

const onAddClick = () => {
  clearTask()
  showModal.value = true
}

const onSubmit = () => {
  showModal.value = false
}
</script>