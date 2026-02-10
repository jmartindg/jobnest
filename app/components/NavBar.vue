<template>
  <header class="bg-primary">
    <nav class="container mx-auto flex items-center justify-between px-4 py-5 sm:px-6">
      <p class="text-primary-content text-xl font-bold">JobNest</p>
      <div class="flex items-center gap-12">
        <ul class="hidden items-center gap-8 md:flex">
          <li v-for="link in navLinks" :key="link.name" class="inline-block">
            <NuxtLink :to="link.href" class="text-primary-content font-medium hover:underline hover:underline-offset-4">{{ link.name }}</NuxtLink>
          </li>
        </ul>
        <section class="hidden items-center gap-3 md:flex">
          <NuxtLink to="/sign-in" class="btn btn-outline text-primary-content hover:text-primary">Sign In</NuxtLink>
          <NuxtLink to="/sign-up" class="btn">Sign Up</NuxtLink>
        </section>
      </div>
      <div class="md:hidden">
        <button class="btn btn-primary btn-ghost p-0" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <Icon :name="isMobileMenuOpen ? 'heroicons:x-mark-solid' : 'heroicons:bars-3'" class="text-primary-content" size="24" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <nav v-if="isMobileMenuOpen" class="md:hidden">
      <section class="bg-primary px-4 pb-6 sm:px-6">
        <ul class="flex flex-col gap-4">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink :to="link.href" class="text-primary-content text-sm font-medium hover:underline hover:underline-offset-4" @click="isMobileMenuOpen = false">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
        <article class="border-primary-content/20 mt-4 flex flex-col items-center gap-3 border-t pt-4">
          <NuxtLink to="/sign-in" class="btn btn-outline text-primary-content hover:text-primary w-full" @click="isMobileMenuOpen = false">Sign In</NuxtLink>
          <NuxtLink to="/sign-up" class="btn w-full" @click="isMobileMenuOpen = false">Sign Up</NuxtLink>
        </article>
      </section>
    </nav>
  </header>
</template>

<script setup>
const isMobileMenuOpen = ref(false);

const navLinks = ref([
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
]);
</script>
