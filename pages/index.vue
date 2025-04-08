<template>
  <main>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: "guest",
});

useSeoMeta({
  title: "JobNest",
  description: "JobNest helps you organize your job search journey. Keep track of application details all in one place. Never miss an opportunity again.",
});
</script>

<style scoped></style>
