<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn no-caps flat @click="$router.push('/')">Todo Today Leaf</q-btn>
        </q-toolbar-title>

        <div>
          <q-btn no-caps flat @click="$router.push('/completed')">Concluídos</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
