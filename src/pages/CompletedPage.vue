<template>
  <q-page padding>
    <h1>{{ $t('concluded.title') }}</h1>

    Filtros <q-toggle v-model="showFilter" />

    <q-date
      v-model="filter"
      v-show="showFilter"
      class="q-mb-md"
      minimal
      range
    />

    <completed-day-component v-for="(day, index) in oldDataStore.filterDaysByDate(filter)" :key="`day-${index}`" :day="day" />
  </q-page>
</template>

<script setup lang="ts">
import CompletedDayComponent from 'components/Completed/DayComponent.vue';
import { useOldDataStore } from 'src/stores/old-data-store';
import { ref } from 'vue';

const oldDataStore = useOldDataStore()

const filter = ref()
const showFilter = ref<boolean>(false)
</script>