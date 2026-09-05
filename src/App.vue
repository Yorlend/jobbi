<script setup lang="ts"></script>

<template>
  <v-app>
    <v-main class="d-flex justify-center">
      <RouterView />
    </v-main>

    <v-bottom-navigation mode="shift" grow>
      <v-btn value="day" to="day">
        <v-icon icon="mdi-clock-outline" />

        <span>Day</span>
      </v-btn>

      <v-btn value="month" to="month">
        <v-icon icon="mdi-calendar-month-outline" />

        <span>Month</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style scoped></style>
