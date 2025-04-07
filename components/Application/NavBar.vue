<template>
  <header class="bg-primary">
    <nav class="flex items-center justify-between px-4 py-5 sm:px-6">
      <p class="text-primary-content text-xl font-bold">JobNest</p>
      <div class="flex items-center gap-12">
        <ul class="hidden items-center gap-8 lg:flex">
          <li v-for="link in navLinks" :key="link.name" class="inline-block">
            <NuxtLink :to="link.href" class="text-primary-content font-medium hover:underline hover:underline-offset-4">{{ link.name }}</NuxtLink>
          </li>
        </ul>
        <div class="hidden items-center gap-3 lg:flex">
          <div class="avatar avatar-placeholder">
            <div class="bg-base-100 w-11 rounded-full">
              <span>JM</span>
            </div>
          </div>
          <div class="text-primary-content flex flex-col items-start">
            <p>Jm De Guia</p>
            <span class="text-xs">jmdeguia09@gmail.com</span>
          </div>
          <button class="ml-2 flex cursor-pointer items-center" @click="clickSignOut">
            <Icon name="ph:sign-out" class="text-primary-content" size="24" />
          </button>
        </div>
      </div>
      <div class="lg:hidden">
        <button class="btn btn-primary btn-ghost">
          <Icon name="fa6-solid:bars" class="text-primary-content" size="20" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(["signOut"]);

const navLinks = ref([
  { name: "My Applications", href: "/applications" },
  { name: "Profile", href: "/applications/profile" },
]);

const clickSignOut = () => {
  emit("signOut");
};
</script>

<style scoped></style>
