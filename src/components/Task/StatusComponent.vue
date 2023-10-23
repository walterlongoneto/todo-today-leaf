<template>
  <q-chip :color="chipColor" text-color="white">
    {{ $t(`task.attributes.statuses.${task.status}`) }}
  </q-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Task, TaskStatus } from '../models';

const props = defineProps<{
  task: Task
}>()

const chipColor = computed<string>(() => {
  let color
  switch(props.task.status) {
    case TaskStatus.Pending:
      color = 'primary'
      break
    case TaskStatus.Completed:
      color = 'green'
      break
    case TaskStatus.Canceled:
      color = 'red'
      break
  }

  return color
})

</script>