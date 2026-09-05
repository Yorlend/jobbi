<script setup lang="ts">
import DateRange from '@/features/day/components/DateRange.vue'
import { useDay } from '@/features/day/composables/useDay'

const { day, date, error, onSave, onReset } = useDay()

const actions = [
  { label: 'Work', color: 'primary', variant: 'tonal', action: () => day.toggleWork() },
  { label: 'Lunch', color: 'secondary', variant: 'tonal', action: () => day.toggleLunch() },
  {
    label: 'Sick',
    color: 'warning',
    variant: 'tonal',
    action: day.setSick,
  },
  {
    label: 'Vacation',
    color: 'info',
    variant: 'tonal',
    action: day.setVacation,
  },
  {
    label: 'Reset',
    color: 'error',
    variant: 'outlined',
    action: onReset,
  },
  {
    label: 'Save',
    color: 'primary',
    variant: 'tonal',
    action: onSave,
  },
] as const
</script>

<template>
  <v-container class="py-8">
    <v-card class="mx-auto pa-6" max-width="520" elevation="3">
      <div class="text-center">
        <div class="text-overline text-medium-emphasis">Today</div>

        <h1 class="text-h4 font-weight-bold">
          {{ date }}
        </h1>
      </div>

      <v-divider class="my-6" />

      <DateRange
        v-model:start-time="day.workingHours.start"
        v-model:end-time="day.workingHours.end"
        title="Working hours"
        class="mx-auto"
      />

      <v-divider class="my-6" />

      <DateRange
        v-model:start-time="day.lunchHours.start"
        v-model:end-time="day.lunchHours.end"
        title="Lunch hours"
        class="mx-auto"
      />

      <v-divider class="my-6" />

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
    </v-card>
    <v-snackbar v-model="error">
      <span>Save error</span>

      <template v-slot:actions>
        <v-btn color="pink" @click="error = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
