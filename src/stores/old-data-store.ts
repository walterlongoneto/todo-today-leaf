import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTodoTodayStore } from './todo-today-store'
import { Day } from 'src/components/models'

export const useOldDataStore = defineStore('oldData', () => {
  const todoTodayStore = useTodoTodayStore()
  const days = ref<Array<Day>>([])

  function finishTheDay() {
    if (new Date() > new Date(todoTodayStore.startedAt)) {
      const day: Day = {
        startedAt: todoTodayStore.startedAt,
        finishedAt: todoTodayStore.finishedAt,
        tasks: todoTodayStore.tasks
      }

      days.value.push(day)

      todoTodayStore.reset()
    }
  }

  return { days, finishTheDay }
}, {
  persist: true
})