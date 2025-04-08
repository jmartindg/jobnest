<template>
  <section>
    <h1 class="text-2xl font-bold">My Profile</h1>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "application",
  middleware: "auth",
});
</script>

<style scoped></style>
