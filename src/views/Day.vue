<script setup lang="ts">
import { useDrafts } from '@/features/draft/composables/useDrafts'
import DraftTimeline from '@/features/draft/components/DraftTimeline.vue'
import CreateDraftDialog from '@/features/draft/components/CreateDraftDialog.vue'

const {
  drafts,
  onSave,
  onDelete,
  onDrop,
  showSaveDialog,
  getDayDuration,
  commitError,
  onDayCommit,
} = useDrafts()

const actions = [
  {
    label: 'Add',
    color: 'primary',
    variant: 'tonal',
    action: () => {
      showSaveDialog.value = true
    },
  },
  {
    label: 'Save Day',
    color: 'secondary',
    variant: 'tonal',
    action: () => {
      onDayCommit()
    },
  },
  {
    label: 'Clear Drafts',
    color: 'red',
    variant: 'tonal',
    action: () => onDrop(),
  },
] as const
</script>

<template>
  <v-container class="py-8">
    <div class="d-flex flex-wrap ga-2 flex-column align-center pa-4">
      <DraftTimeline
        v-for="draft in drafts"
        :key="draft.uid"
        :draft="draft"
        @save="onSave"
        @delete="onDelete"
      />
    </div>

    <div class="d-flex flex-row-reverse">Working hours: {{ getDayDuration() }}</div>

    <div class="d-flex flex-wrap ga-2">
      <v-btn
        v-for="action in actions"
        :key="action.label"
        :color="action.color"
        :variant="action.variant"
        @click="action.action"
        class="flex-grow-1"
      >
        {{ action.label }}
      </v-btn>
    </div>
    <v-dialog v-model="showSaveDialog" max-width="500">
      <CreateDraftDialog @save="onSave" @cancel="showSaveDialog = false" />
    </v-dialog>
    <v-dialog v-model="commitError.status" max-width="500">
      <v-card>
        <v-card-title class="pt-4">Error</v-card-title>
        <v-card-text class="pa-4">{{ commitError.message }}</v-card-text>
        <v-card-actions class="pa-4 pt-0 ga-2">
          <v-spacer />
          <v-btn color="red" variant="outlined" @click="commitError.status = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
