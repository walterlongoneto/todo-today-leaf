<template>
  <div>
    <q-list bordered separator>
      <q-item
        v-for="(task, index) in store.tasks"
        :key="`task-${index}`"
        clickable
        @click="onItemClick(task)"
      >
        <q-item-section>
          {{ task.description }}
        </q-item-section>
        <q-item-section side>
          <task-status-progress :task="task"></task-status-progress>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section>
          <h3>Editar Task</h3>
        </q-card-section>

        <q-card-section>
          <form-component :task="selectedTask" @submit="onSubmit"></form-component>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import TaskStatusProgress from 'components/Task/StatusProgressComponent.vue'
import { Task } from 'components/models'
import { useTodoTodayStore } from 'stores/todo-today-store'
import { ref } from 'vue'
import FormComponent from './FormComponent.vue'

const store = useTodoTodayStore();

let selectedTask = ref<Task>({ description: '', totalPomodoros: 0, pomodoros: [] })
const showModal = ref<boolean>(false)

const onItemClick = (task: Task) => {
  selectedTask.value = task
  showModal.value = true
}

const onSubmit = () => {
  selectedTask = ref<Task>({ description: '', totalPomodoros: 0, pomodoros: [] })
  showModal.value = false
}
</script>