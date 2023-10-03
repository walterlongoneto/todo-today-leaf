export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Day {
  startedAt: Date | null;
  finishedAt: Date | null;
  tasks: Array<Task>;
}

export interface Task {
  description: string;
  status: string;
  totalPomodoros: number;
  pomodoros: Array<Pomodoro>;
  updatedAt?: Date;
}

export interface Pomodoro {
  secondPlanning: boolean;
  status: string;
  updatedAt: Date | null;
}