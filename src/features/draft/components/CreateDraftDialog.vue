<script setup lang="ts">
import { ref } from 'vue'
import { DraftType, type Draft } from '../models/draft'
import { getDateFromTime } from '@/util/time';
import { v7 as uuidv7 } from 'uuid';

const emit = defineEmits<{
  save: [draft: Draft]
  cancel: []
}>()

const title = ref('')
const start_time = ref('')
const end_time = ref('')
const type = ref<DraftType>(DraftType.Work)

function onSave() {
  if (title.value === '')
    return
  emit('save', {
    uid: uuidv7(),
    title: title.value,
    start_time: start_time.value !== '' ? getDateFromTime(start_time.value) : undefined,
    end_time: end_time.value !== '' ? getDateFromTime(end_time.value) : undefined,
    type: type.value,
  })

  emit('cancel')
}

</script>

<template>
  <v-card>
    <v-card-title class="pt-4">
      Add Draft
    </v-card-title>
    <v-card-text class="pa-4">
      <div class="d-flex flex-column ga-4">
        <span>Title: </span>
        <v-text-field
          v-model="title"
          type="text"
          variant="outlined"
          density="compact"
          hide-details
        />
        <div class="d-flex ga-4 align-center">
          <span>Start: </span>
          <v-text-field
            v-model="start_time"
            type="time"
            variant="outlined"
            density="compact"
            hide-details
          />

          <span>End: </span>
          <v-text-field
            v-model="end_time"
            type="time"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>
        <div class="flex flex-row">
          <v-combobox
            label="Type"
            variant="outlined"
            density="compact"
            :items="[DraftType.Work, DraftType.Lunch]"
            v-model="type"
          />
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="pa-4 pt-0 ga-2">
      <v-spacer />
      <v-btn color="primary" variant="flat" @click="onSave">Add</v-btn>

      <v-btn color="error" variant="tonal" @click="emit('cancel')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
