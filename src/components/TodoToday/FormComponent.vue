<template>
  <q-form @submit.prevent="onSubmit">
    <q-input
      v-model="description"
      :label="$t('todoToday.form.description')"
      :rules="[ val => val && val.length > 0 || $t('form.errors.blank')]"
    />

    <q-input
      v-model="totalPomodoros"
      :label="$t('todoToday.form.totalPomodoros')"
      type="number"
      style="max-width: 300px"
      :rules="[
        val => val && val.length > 0 || $t('form.errors.blank'),
        val => isTotalGreaterThanConcluded(val) || $t('task.errors.totalGreatherThanConcluded')
      ]"
    />

    <div class="q-mt-sm">
      <q-btn
        v-show="task.status == TaskStatus.Pending"
        class="q-mr-sm"
        :label="$t('form.buttons.submit')"
        type="submit"
        color="primary"
      />
      <q-btn
        v-show="task.id && task.status != TaskStatus.Pending"
        class="q-mr-sm"
        :label="$t('task.form.buttons.reset')"
        color="white"
        text-color="black"
        @click="onReset"
      />
      <q-btn
        v-show="task.id && task.status == TaskStatus.Pending"
        class="q-mr-sm"
        :label="$t('task.form.buttons.complete')"
        color="secondary"
        @click="onComplete"
      />
      <q-btn
        v-show="task.id && task.status == TaskStatus.Pending"
        class="q-mr-sm"
        :label="$t('task.form.buttons.cancel')"
        color="white"
        text-color="black"
        @click="onCancel"
      />
      <q-btn
        v-show="task.id && task.status == TaskStatus.Pending"
        class="q-mr-sm"
        :label="$t('form.buttons.delete')"
        color="red"
        @click="onRemove"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { Pomodoro, PomodoroStatus, Task, TaskStatus } from 'components/models'
import { useTodoTodayStore } from 'stores/todo-today-store'
import { useTaskStore } from 'stores/task-store'
import { ref } from 'vue'

const store = useTodoTodayStore()
const taskStore = useTaskStore()


const props = defineProps<{
  task: Task
}>()
const emits = defineEmits(['submit'])

const description = ref<string>(props.task.description)
const totalPomodoros = ref<number>(props.task.totalPomodoros)

const onSubmit = () => {
  if (props.task.status == TaskStatus.Pending) {
    store.saveTask(props.task, description.value, totalPomodoros.value)
    emits('submit')
  }
}

const onComplete = () => {
  taskStore.completeTask(props.task)
  emits('submit')
}

const onCancel = () => {
  taskStore.cancelTask(props.task)
  emits('submit')
}

const onRemove = () => {
  store.removeTask(props.task)
  emits('submit')
}

const onReset = () => {
  taskStore.resetTask(props.task)
  emits('submit')
}

function isTotalGreaterThanConcluded(total: number) : boolean {
  const concluded: Array<Pomodoro> = props.task.pomodoros.filter(pomodoro => {
    return pomodoro.status == PomodoroStatus.Completed
  })

  return total >= concluded.length
}
</script>