<template>
  <div>
    <q-list bordered separator>
      <q-item v-for="(task, index) in todoTodayStore.tasks" :key="`task-${index}`">
        <q-item-section>
          <q-btn
            flat
            no-caps
            align="left"
            :label="task.description"
            @click="onItemClick(task)"
          />
        </q-item-section>
        <q-item-section side>
          <task-status-progress :task="task"></task-status-progress>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showModal">
      <q-card style="width: 500px">
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
import TaskStatusProgress from 'components/Task/StatusProgressComponent.vue';
import { Task } from 'components/models';
import { useTaskStore } from 'src/stores/task-store';
import { useTodoTodayStore } from 'stores/todo-today-store';
import { ref } from 'vue';
import FormComponent from './FormComponent.vue';

const todoTodayStore = useTodoTodayStore()
const taskStore = useTaskStore()

let selectedTask = ref<Task>(taskStore.buildTask())
const showModal = ref<boolean>(false)

const onItemClick = (task: Task) => {
  selectedTask.value = task
  showModal.value = true
}

const onSubmit = () => {
  selectedTask = ref<Task>(taskStore.buildTask())
  showModal.value = false
}
</script>