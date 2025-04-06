<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="bg-base-200 flex min-h-screen items-center justify-center px-4 py-12">
    <div class="card bg-base-100 w-full max-w-md shadow-lg">
      <div class="card-body">
        <div class="mb-8 text-center">
          <h1 class="text-primary mb-2 text-2xl font-bold">Create an account</h1>
          <p class="text-base-content/90">Sign up to continue to <NuxtLink to="/" class="hover:underline">JobNest</NuxtLink></p>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="name" class="label mb-1">
              <span class="text-base-content">Name</span>
            </label>
            <input id="name" v-model="name" type="text" class="input w-full" required />
          </div>

          <div class="mb-4">
            <label for="email" class="label mb-1">
              <span class="text-base-content">Email</span>
            </label>
            <input id="email" v-model="email" type="email" class="input w-full" required />
          </div>

          <div class="mb-6">
            <label for="password" class="label mb-1">
              <span class="text-base-content">Password</span>
            </label>
            <input id="password" v-model="password" type="password" class="input w-full" required />
          </div>

          <div class="mt-6">
            <button type="submit" class="btn btn-primary w-full">Create your account</button>
          </div>
        </form>

        <div class="divider my-6">OR</div>

        <div class="mb-4 flex w-full">
          <button class="btn btn-outline w-full">
            <GoogleSVG />
            Sign Up with Google
          </button>
        </div>

        <div class="text-center">
          <p class="mb-4">Already have an account?</p>
          <NuxtLink to="/sign-in" class="btn btn-outline btn-primary w-full">Sign In</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
});

useSeoMeta({
  title: "JobNest | Sign Up",
  description: "Create your JobNest account",
});

const name = ref("");
const email = ref("");
const password = ref("");

const handleRegister = () => {
  console.log("Login attempt with:", { email: email.value, password: password.value });
};
</script>

<style scoped></style>
