import { defineStore } from 'pinia';
import { Day } from 'src/components/models';
import { ref } from 'vue';
import { useTodoTodayStore } from './todo-today-store';

export const useOldDataStore = defineStore('oldData', () => {
  const todoTodayStore = useTodoTodayStore()
  const days = ref<Array<Day>>([])

  function filterDaysByDate(filter: { from: string; to: string }): Array<Day> {
    if (filter && filter.from != '' && filter.to != '') {
      return days.value.filter(day => {
        const startedAt = new Date(day.startedAt)
        const from = new Date(filter.from)
        const to = new Date(filter.to)
        to.setHours(23)
        to.setMinutes(59)

        console.log(from, to)

        return startedAt >= from && startedAt <= to
      }).toReversed()
    } else {
      return days.value.toReversed()
    }
  }

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

  return { days, filterDaysByDate, finishTheDay }
}, {
  persist: true
})