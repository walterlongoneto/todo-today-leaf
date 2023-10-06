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
  id: number,
  description: string;
  status: string;
  totalPomodoros: number;
  pomodoros: Array<Pomodoro>;
  updatedAt?: Date;
}

export enum PomodoroStatus {
  Pending = "pending",
  Completed = "completed"
}

export interface Pomodoro {
  secondPlanning: boolean;
  status: PomodoroStatus;
  updatedAt: Date | null;
}