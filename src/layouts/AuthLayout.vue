<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- Back to Home Button -->
      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <q-btn
          to="/"
          flat
          rounded
          dense
          icon="arrow_back"
          label="Home"
          class="absolute-top-left q-ma-md text-white bg-black/50 backdrop-blur z-top hover-scale"
          no-caps
          style="z-index: 2000;"
        />
      </transition>
      
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Minimal layout for authentication pages
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}
</style>
