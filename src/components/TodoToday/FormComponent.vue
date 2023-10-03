<template>
  <q-form @submit="onSubmit">
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
      :rules="[ val => val && val.length > 0 || $t('form.errors.blank')]"
    />

    <div class="q-mt-sm">
      <q-btn :label="$t('form.buttons.submit')" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const description = ref();
const totalPomodoros = ref();

function onSubmit() {
  console.log('passou submit');
}
</script>