export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Day {
  startedAt: Date;
  finishedAt?: Date
  tasks: Array<Task>;
}

export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
  Canceled = 'canceled'
}

export interface Task {
  id?: number;
  description: string;
  status: TaskStatus;
  pomodoros: Array<Pomodoro>;
  updatedAt?: Date;
}

export enum PomodoroStatus {
  Pending = 'pending',
  Completed = 'completed'
}

export interface Pomodoro {
  secondPlanning: boolean;
  status: PomodoroStatus;
  updatedAt?: Date;
}