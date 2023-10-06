<template>
  <div>
    <q-list bordered separator>
      <q-item v-for="task in store.tasks" :key="`task-${task.id}`" clickable v-ripple>
        <q-item-section>
          {{ task.description }}
        </q-item-section>
        <q-item-section side>
          <task-status-progress :task="task"></task-status-progress>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useTodoTodayStore } from 'stores/todo-today-store';
import TaskStatusProgress from 'components/Task/StatusProgressComponent.vue';

const store = useTodoTodayStore();
</script>