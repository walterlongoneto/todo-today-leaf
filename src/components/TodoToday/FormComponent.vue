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
      style="max-width: 200px"
      :rules="[
        val => val && val.length > 0 || $t('form.errors.blank'),
      ]"
    />

    <div class="q-mt-sm">
      <q-btn :label="$t('form.buttons.submit')" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { Task } from 'components/models'
import { useTodoTodayStore } from 'stores/todo-today-store'
import { ref } from 'vue'

const store = useTodoTodayStore()
const props = defineProps<{
  task: Task
}>()
const emits = defineEmits(['submit'])

const description = ref<string>(props.task.description)
const totalPomodoros = ref<number>(props.task.totalPomodoros)

const onSubmit = () => {
  store.saveTask(props.task, description.value, totalPomodoros.value)
  emits('submit')
}
</script>