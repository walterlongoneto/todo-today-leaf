import { defineStore } from 'pinia'
import { Day, Task, Pomodoro, PomodoroStatus } from 'src/components/models'

export const useTodoTodayStore = defineStore('todoToday', {
  state: (): Day => {
    return {
      startedAt: null,
      finishedAt: null,
      tasks: []
    }
  },
  actions: {
    startDay() {
      if (this.startedAt == null) {
        this.startedAt = new Date();
      }
    },
    saveTask(task: Task, description: string, totalPomodoros: number) {
      task.description = description
      task.updatedAt = new Date()
      task.totalPomodoros = totalPomodoros
      if (totalPomodoros != task.pomodoros.length) {
        if (totalPomodoros > task.pomodoros.length) {
          const started = task.pomodoros.find(pomodoro => pomodoro.status == PomodoroStatus.Completed)
          const drift = totalPomodoros - task.pomodoros.length
          for (let i = 0; i < drift; i++) {
            const pomodoro: Pomodoro = { secondPlanning: false, status: PomodoroStatus.Pending, updatedAt: new Date() }
            if (started) {
              pomodoro.secondPlanning = true
            }
            task.pomodoros.push(pomodoro)
          }
        } else {
          const sliceEnd = task.pomodoros.length - totalPomodoros
          task.pomodoros.splice(0, sliceEnd)
        }
      }

      if (!task.id) {
        task.id = this.tasks.length + 1
        this.tasks.push(task)
      }
    }
  },
});
