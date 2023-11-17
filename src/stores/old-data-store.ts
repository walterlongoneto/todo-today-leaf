import { defineStore } from 'pinia';
import { Day } from 'src/components/models';
import { ref } from 'vue';
import { useTodoTodayStore } from './todo-today-store';

export const useOldDataStore = defineStore('oldData', () => {
  const todoTodayStore = useTodoTodayStore()
  const days = ref<Array<Day>>([])

  function filterDaysByDate(filter: any): Array<Day> {
    console.log("passou filter ", filter)
    if (filter) {
      let from:Date
      let to:Date

      if (filter.from && filter.to) {
        from = new Date(filter.from)
        to = new Date(filter.to)
      } else {
        from = new Date(filter)
        to = new Date(filter)
      }

      to.setHours(23)
      to.setMinutes(59)

      return days.value.filter(day => {
        const startedAt = new Date(day.startedAt)

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