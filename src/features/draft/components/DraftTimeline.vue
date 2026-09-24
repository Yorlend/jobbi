<script setup lang="ts">
import { dateToString, getDuration } from '@/util/time'
import { DraftType, type Draft } from '../models/draft'
import { useDraftTimer } from '../composables/useDraftTimer'
import { ref } from 'vue'
import EditDraftDialog from './EditDraftDialog.vue'

const props = defineProps<{
  draft: Draft
}>()

const emit = defineEmits<{
  save: [draft: Draft]
  delete: [uid: string]
}>()

const showEditDialog = ref(false)

const { toggleTimer, canToggle, getDraftDuration } = useDraftTimer()

const handleToggle = () => {
  const upd = toggleTimer(props.draft)
  emit('save', upd)
}
</script>

<template>
  <v-card class="pa-4" width="400">
    <v-card-title class="px-0">
      <v-icon>{{ draft.type === DraftType.Lunch ? 'mdi-food' : 'mdi-account-hard-hat' }}</v-icon>
      {{ draft.title }}
    </v-card-title>

    <v-card-text class="px-0">
      <div class="d-flex align-center ga-4 mb-3">
        <span class="time-label">Start: {{ dateToString(draft.start_time) }}</span>
        <span class="time-label">End: {{ dateToString(draft.end_time) }}</span>
      </div>
      <div class="d-flex ga-4 mb-3">
        <v-spacer />
        <span>Duration: {{ getDraftDuration(draft) }}</span>
      </div>
    </v-card-text>

    <template v-slot:actions>
      <v-btn
        prepend-icon="mdi-clock-edit-outline"
        text="Edit"
        variant="outlined"
        @click="showEditDialog = true"
      />
      <v-btn
        prepend-icon="mdi-timer-outline"
        text="Toggle"
        variant="outlined"
        :disabled="!canToggle(draft)"
        @click="handleToggle"
      />
      <v-btn
        prepend-icon="mdi-trash-can-outline"
        text="Delete"
        variant="outlined"
        @click="$emit('delete', draft.uid)"
      />
    </template>
  </v-card>
  <v-dialog v-model="showEditDialog" max-width="500">
    <EditDraftDialog
      :draft="draft"
      @save="(d) => $emit('save', d)"
      @cancel="showEditDialog = false"
    />
  </v-dialog>
</template>
