<script setup lang="ts">
defineProps<{
  title: string
}>()

const startTime = defineModel<string>('startTime', {
  default: '',
})

const endTime = defineModel<string>('endTime', {
  default: '',
})
</script>

<template>
  <v-card class="pa-4" max-width="400">
    <v-card-title class="px-0">
      {{ title }}
    </v-card-title>

    <v-card-text class="px-0">
      <div class="d-flex align-center ga-4 mb-3">
        <span class="time-label">Start:</span>

        <v-text-field
          v-model="startTime"
          type="time"
          variant="outlined"
          density="compact"
          hide-details
        />
      </div>

      <div class="d-flex align-center ga-4">
        <span class="time-label">End:</span>

        <v-text-field
          v-model="endTime"
          type="time"
          variant="outlined"
          density="compact"
          hide-details
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.time-label {
  width: 50px;
  flex-shrink: 0;
}
</style>
