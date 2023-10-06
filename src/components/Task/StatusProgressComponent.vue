<template>
  <div class="q-gutter-sm">
    <q-icon v-for="icon in pomodoros" :key="icon" :name="icon"  size="xs"/>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Task, Pomodoro, PomodoroStatus } from 'components/models';

const props = defineProps<{
  task: Task
}>()

const getPomodoroIcon = (pomodoro: Pomodoro): string => {
  if (pomodoro.status ==  PomodoroStatus.Pending) {
    return pomodoro.secondPlanning ? 'radio_button_unchecked' : 'check_box_outline_blank'
  } else {
    return pomodoro.secondPlanning ? 'check_box' : 'check_circle'
  }
}

const pomodoros = computed<Array<string>>(() => props.task.pomodoros.map(pomodoro => getPomodoroIcon(pomodoro)))
</script>