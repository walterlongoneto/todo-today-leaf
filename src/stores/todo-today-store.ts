import { defineStore } from 'pinia'
import { Task } from 'src/components/models'
import { ref } from 'vue'
import { useTaskStore } from './task-store'

export const useTodoTodayStore = defineStore('todoToday', () => {
  const taskStore = useTaskStore()

  const startedAt = ref()
  const finishedAt = ref()
  const tasks = ref<Array<Task>>([])

  function startDay() {
    if (startedAt.value == null) {
      startedAt.value = new Date()
    }
  }

  function saveTask(task: Task, description: string, totalPomodoros: number) {
    taskStore.saveTask(task, description, totalPomodoros)

    if (!task.id) {
      task.id = tasks.value.length + 1
      tasks.value.push(task)
    }
  }

  return { tasks, startDay, saveTask }
})
