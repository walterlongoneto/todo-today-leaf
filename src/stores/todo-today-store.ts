import { defineStore } from 'pinia';
import { Day, DayCount, PomodoroStatus, Task } from 'src/components/models';
import { ref } from 'vue';
import { useTaskStore } from './task-store';

export const useTodoTodayStore = defineStore('todoToday', () => {
  const taskStore = useTaskStore()

  const startedAt = ref<Date>(new Date())
  const finishedAt = ref()
  const tasks = ref<Array<Task>>([])

  function getDayCount(day: Day): DayCount {
    const dayCount: DayCount = { executed: 0, planned: 0 }

    tasks.value.map(task => {
      dayCount.executed += task.pomodoros.filter(pomodoro => pomodoro.status == PomodoroStatus.Completed).length
      dayCount.planned += task.pomodoros.length
    })

    return dayCount
  }

  function reset() {
    startedAt.value = new Date()
    finishedAt.value = null
    tasks.value = []
  }

  function saveTask(task: Task, description: string, totalPomodoros: number) {
    taskStore.saveTask(task, description, totalPomodoros)

    if (!task.id) {
      task.id = tasks.value.length + 1
      tasks.value.push(task)
    }
  }

  function removeTask(task: Task) {
    const taskIndex = tasks.value.findIndex(internalTask => internalTask.id == task.id)
    if (taskIndex > -1) {
      tasks.value.splice(taskIndex, 1)
    }
  }

  function getCurrentDay(): Day {
    return { startedAt: startedAt.value, tasks: tasks.value, finishedAt: finishedAt.value }
  }

  return { startedAt, finishedAt, tasks, getDayCount, saveTask, removeTask, reset, getCurrentDay }
},
{
  persist: true
})
