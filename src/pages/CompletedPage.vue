<template>
  <q-page padding>
    <h1>{{ $t('concluded.title') }}</h1>

    <completed-day-component v-for="(day, index) in oldDataStore.days" :key="`day-${index}`" :day="day" />
  </q-page>
</template>

<script setup lang="ts">
import CompletedDayComponent from 'components/Completed/DayComponent.vue';
import { useOldDataStore } from 'src/stores/old-data-store';

const oldDataStore = useOldDataStore()
</script>