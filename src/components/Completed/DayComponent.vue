<template>
  <q-card class="q-mb-md">
    <q-card-section>
      <div class="text-h3">{{ startedAt }}</div>
    </q-card-section>

    <q-card-section>
      <todo-today-counter-component :day="props.day" />
    </q-card-section>

    <q-card-section>
      <todo-today-list-component :tasks="props.day.tasks" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import TodoTodayListComponent from 'components/TodoToday/ListComponent.vue';
import TodoTodayCounterComponent from 'components/TodoToday/CounterComponent.vue';
import { Day } from '../models';
import { computed } from 'vue';

const props = defineProps<{
  day: Day
}>()

const startedAt = computed(() => {
  const parsedDate = new Date(props.day.startedAt)
  const year = parsedDate.getFullYear()
  const month = parsedDate.getMonth()
  const day = parsedDate.getDate()

  return `${day}/${month}/${year}`
})
</script>