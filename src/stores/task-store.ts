import { defineStore } from 'pinia'
import { Pomodoro, PomodoroStatus, Task } from 'src/components/models'
import { usePomodoroStore } from './pomodoro-store'

export const useTaskStore = defineStore('task', () => {
  const pomodoroStore = usePomodoroStore()

  function saveTask(task: Task, description: string, totalPomodoros: number) {
    task.description = description
    task.updatedAt = new Date()
    task.totalPomodoros = totalPomodoros
    if (totalPomodoros != task.pomodoros.length) {
      if (totalPomodoros > task.pomodoros.length) {
        const started = task.pomodoros.find(pomodoro => pomodoro.status == PomodoroStatus.Completed) != undefined
        const drift = totalPomodoros - task.pomodoros.length

        for (let i = 0; i < drift; i++) {
          const pomodoro: Pomodoro = pomodoroStore.buildPomodoro(started)
          task.pomodoros.push(pomodoro)
        }
      } else {
        const sliceEnd = task.pomodoros.length - totalPomodoros
        task.pomodoros.splice(0, sliceEnd)
      }
    }
  }

  return { saveTask }
})