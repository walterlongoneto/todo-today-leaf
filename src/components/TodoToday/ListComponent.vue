<template>
  <div>
    <q-tooltip no-parent-event v-model="showCopyTooltip">
      Copiado!
    </q-tooltip>

    <q-list bordered separator>
      <q-item v-for="(task, index) in props.tasks" :key="`task-${index}`">
        <q-item-section>
          <q-btn
            flat
            no-caps
            align="left"
            :label="task.description"
            @click="onItemClick(task)"
          />
        </q-item-section>
        <q-item-section side>
          <task-status-progress :task="task" :readonly="props.readonly"></task-status-progress>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showModal">
      <q-card class="full-width">
        <q-card-section>
          <h3>Editar Task</h3>
        </q-card-section>

        <q-card-section>
          <form-component :task="selectedTask" @submit="onSubmit"></form-component>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import TaskStatusProgress from 'components/Task/StatusProgressComponent.vue';
import { Task } from 'components/models';
import { useTaskStore } from 'src/stores/task-store';
import { ref } from 'vue';
import FormComponent from './FormComponent.vue';

interface Props {
  tasks: Array<Task>;
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: true
})

const taskStore = useTaskStore()

let selectedTask = ref<Task>(taskStore.buildTask())
const showModal = ref<boolean>(false)
const showCopyTooltip = ref<boolean>(false)

const copyContent = async (text: string) => {
  try {
    showCopyTooltip.value = true
    await navigator.clipboard.writeText(text)
    await new Promise(_resolve => setTimeout(_resolve, 1000))
    showCopyTooltip.value = false
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const onItemClick = (task: Task) => {
  if (!props.readonly) {
    selectedTask.value = task
    showModal.value = true
  } else {
    copyContent(task.description)
  }
}

const onSubmit = () => {
  selectedTask = ref<Task>(taskStore.buildTask())
  showModal.value = false
}
</script>