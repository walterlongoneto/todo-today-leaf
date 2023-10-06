import { defineStore } from 'pinia';
import { Day, Task } from 'src/components/models';

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
    saveTask(task: Task) {
      this.tasks.push(task);
    }
  },
});
