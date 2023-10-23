<template>
  <div class="q-gutter-sm">
    <q-btn
      v-for="(pomodoro, index) in props.task.pomodoros"
      flat
      round
      :key="`pomodoro-${index}`"
      :icon="getPomodoroIcon(pomodoro)"
      @click="handlePomodoroClick(pomodoro)"
      size="md"
    />
  </div>
</template>

<script setup lang="ts">
import { Task, Pomodoro, PomodoroStatus } from 'components/models'
import { usePomodoroStore } from 'src/stores/pomodoro-store'

const props = defineProps<{
  task: Task
}>()

const pomodoroStore = usePomodoroStore()

const getPomodoroIcon = (pomodoro: Pomodoro): string => {
  if (pomodoro.status ==  PomodoroStatus.Pending) {

    return pomodoro.secondPlanning ? 'radio_button_unchecked' : 'check_box_outline_blank'
  } else {
    return pomodoro.secondPlanning ? 'check_circle' : 'check_box'
  }
}

function handlePomodoroClick(pomodoro: Pomodoro): void {
  if (pomodoro.status == PomodoroStatus.Pending) {
    pomodoroStore.completePomodoro(pomodoro)
  } else {
    pomodoroStore.pendingPomodoro(pomodoro)
  }
}
</script>