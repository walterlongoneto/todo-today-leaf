import { defineStore } from 'pinia'
import { Pomodoro, PomodoroStatus } from 'src/components/models'

export const usePomodoroStore = defineStore('pomodoro', () => {
  function buildPomodoro(secondPlanning?: boolean): Pomodoro {
    secondPlanning ||= false
    return { secondPlanning, status: PomodoroStatus.Pending, updatedAt: new Date() }
  }

  function completePomodoro(pomodoro: Pomodoro) {
    pomodoro.updatedAt = new Date()
    pomodoro.status = PomodoroStatus.Completed
  }

  function pendingPomodoro(pomodoro: Pomodoro) {
    pomodoro.updatedAt = new Date()
    pomodoro.status = PomodoroStatus.Pending
  }

  return { buildPomodoro, completePomodoro, pendingPomodoro }
})