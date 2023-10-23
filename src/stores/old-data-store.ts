import { defineStore } from 'pinia';
import { Day } from 'src/components/models';
import { ref } from 'vue';
import { useTodoTodayStore } from './todo-today-store';

export const useOldDataStore = defineStore('oldData', () => {
  const todoTodayStore = useTodoTodayStore()
  const days = ref<Array<Day>>([])

  function finishTheDay() {
    const startedAt = new Date(todoTodayStore.startedAt)
    if (new Date() > new Date(startedAt.getFullYear(), startedAt.getMonth(), startedAt.getDate(), 23, 59)) {
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