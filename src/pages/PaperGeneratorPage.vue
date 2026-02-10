<template>
  <q-page class="q-pa-lg bg-black text-white font-sans">
    <div class="max-width-container">
      <div class="flex items-center justify-between q-mb-xl">
        <div>
          <h1 class="text-h4 text-weight-bold text-white q-mb-xs">AI Paper Generator</h1>
          <p class="text-grey-5">Create AI-powered exam papers and study materials.</p>
        </div>
      </div>

      <q-card class="glass-card q-pa-xl text-center">
        <q-icon name="auto_awesome" size="4rem" color="primary" class="q-mb-md" />
        <div class="text-h5 text-weight-bold">AI Paper Generator</div>
        <div class="text-grey-5 q-mt-sm">Gemini integration for paper generation is coming soon.</div>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
}
.glass-card {
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
}
</style>
