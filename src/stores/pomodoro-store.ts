import { defineStore } from 'pinia'
import { Pomodoro, PomodoroStatus } from 'src/components/models'

export const usePomodoroStore = defineStore('pomodoro', () => {
  function buildPomodoro(secondPlanning?: boolean): Pomodoro {
    secondPlanning ||= false
    return { secondPlanning, status: PomodoroStatus.Pending, updatedAt: new Date() }
  }

  return { buildPomodoro }
})