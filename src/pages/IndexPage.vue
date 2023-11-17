<template>
  <q-page padding>
    <title-component></title-component>
    <q-card flat class="q-mb-md">
      <counter-component :day="todoTodayStore.getCurrentDay()"></counter-component>
    </q-card>
    <list-component :tasks="todoTodayStore.sortedTasks" :readonly="false"></list-component>
  </q-page>
</template>

<script setup lang="ts">
import ListComponent from 'components/TodoToday/ListComponent.vue';
import TitleComponent from 'components/TodoToday/TitleComponent.vue';
import CounterComponent from 'components/TodoToday/CounterComponent.vue';
import { useOldDataStore } from 'src/stores/old-data-store';
import { useTodoTodayStore } from 'stores/todo-today-store';

const oldDataStore = useOldDataStore()
const todoTodayStore = useTodoTodayStore()

oldDataStore.finishTheDay()
</script>
