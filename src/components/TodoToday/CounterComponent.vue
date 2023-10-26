<template>
  <q-card-section>
    <q-chip>
      <q-avatar color="primary" text-color="white">{{ dayCount.planned }}</q-avatar>
      Planejado
    </q-chip>

    <q-chip>
      <q-avatar color="green" text-color="white">{{ dayCount.executed }}</q-avatar>
      Executado
    </q-chip>
  </q-card-section>
</template>

<script setup lang="ts">
import { useTodoTodayStore } from 'stores/todo-today-store';
import { Day, DayCount } from 'components/models'
import { computed } from 'vue';

interface Props {
  day: Day
}

const props = defineProps<Props>()
const todoTodayStore = useTodoTodayStore()
const dayCount = computed<DayCount>(() => todoTodayStore.getDayCount(props.day))

</script>