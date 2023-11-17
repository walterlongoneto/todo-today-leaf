import { defineStore } from 'pinia';
import { Day, DayCount, PomodoroStatus, Task, TaskStatus } from 'src/components/models';
import { computed, ref } from 'vue';
import { useTaskStore } from './task-store';

export const useTodoTodayStore = defineStore('todoToday', () => {
  const taskStore = useTaskStore()

  const startedAt = ref<Date>(new Date())
  const finishedAt = ref()
  const tasks = ref<Array<Task>>([])

  const sortedTasks = computed<Array<Task>>(() => {
    return tasks.value.sort((t1, t2) => {
      if (t1.status == t2.status) {
        return 0
      } else {
        if (t1.status == TaskStatus.Completed && t2.status != TaskStatus.Completed) {
          return 1
        } else {
          return -1
        }
      }
    })
  })

  function getDayCount(day: Day): DayCount {
    const dayCount: DayCount = { executed: 0, planned: 0 }

    day.tasks.map(task => {
      dayCount.executed += task.pomodoros.filter(pomodoro => pomodoro.status == PomodoroStatus.Completed).length
      if (task.status == TaskStatus.Pending) {
        dayCount.planned += task.pomodoros.length
      }
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

  return { startedAt, finishedAt, tasks, sortedTasks, getDayCount, saveTask, removeTask, reset, getCurrentDay }
},
{
  persist: true
})
