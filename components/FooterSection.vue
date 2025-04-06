<template>
  <footer class="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
    <nav>
      <ul class="flex flex-col items-center gap-8 sm:flex-row">
        <li v-for="link in footerLinks" :key="link.name">
          <NuxtLink :to="link.href" class="hover:underline hover:underline-offset-4">{{ link.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <aside>
      <p class="text-xl font-bold">JobNest</p>
      <p class="text-xs">Copyright © {{ new Date().getFullYear() }} - All rights reserved</p>
    </aside>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = ref([
  { name: "Sign In", href: "/sign-in" },
  { name: "Sign Up", href: "/sign-up" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
]);
</script>

<style scoped></style>
