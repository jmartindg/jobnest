<template>
  <header class="bg-primary">
    <nav class="container mx-auto flex items-center justify-between px-4 py-5 sm:px-6 xl:px-0">
      <p class="text-primary-content text-xl font-bold">JobNest</p>
      <ul class="hidden items-center space-x-8 lg:flex">
        <li v-for="link in navLinks" :key="link.name" class="inline-block">
          <NuxtLink :to="link.href" class="text-primary-content font-semibold hover:underline hover:underline-offset-4">{{ link.name }}</NuxtLink>
        </li>
      </ul>
      <section class="hidden items-center space-x-2 lg:flex">
        <NuxtLink to="/sign-in" class="btn btn-outline text-primary-content hover:text-primary">Sign In</NuxtLink>
        <NuxtLink to="/sign-up" class="btn">Sign Up</NuxtLink>
      </section>
      <div class="lg:hidden">
        <button class="btn btn-primary btn-ghost">
          <Icon name="fa6-solid:bars" class="text-primary-content" size="20" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
const navLinks = ref([
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
]);
</script>
