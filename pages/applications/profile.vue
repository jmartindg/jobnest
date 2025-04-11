<!-- eslint-disable vue/html-self-closing -->
<template>
  <section>
    <h1 class="text-2xl font-bold">My Profile</h1>
    <section class="mt-8">
      <article class="flex items-center gap-4">
        <div class="avatar avatar-placeholder">
          <div class="bg-primary w-16 rounded-full">
            <span class="text-primary-content text-2xl">{{ user?.user_metadata?.name?.[0] || "" }} </span>
          </div>
        </div>

        <div class="flex flex-col items-start">
          <div class="flex items-center gap-2">
            <p class="text-lg font-semibold">{{ user?.user_metadata.name }}</p>
            <div v-if="user?.user_metadata?.email_verified" class="badge badge-success badge-sm">Verified</div>
          </div>
          <span class="text-base-content/90 text-sm">{{ user?.email }}</span>
        </div>
      </article>
    </section>

    <div class="divider my-6"></div>

    <section>
      <h2 class="mb-4 text-xl font-semibold">Account Settings</h2>
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <form @submit.prevent="updateUser">
            <div class="mb-4">
              <label for="updateName" class="label mb-1">
                <span class="text-base-content">Name</span>
              </label>
              <input id="updateName" v-model="name" type="text" class="input w-full" required />
            </div>

            <div class="mb-4">
              <label for="updateEmail" class="label mb-1">
                <span class="text-base-content">Email</span>
              </label>
              <input id="updateEmail" v-model="email" type="email" class="input w-full" required />
            </div>

            <div class="mt-6 text-end">
              <button type="submit" class="btn btn-primary w-full lg:w-auto" :disabled="updateLoading">Update Profile</button>
            </div>
          </form>
        </div>

        <div>
          <form @submit.prevent="updatePassword">
            <div class="mb-4">
              <label for="updatePassword" class="label mb-1">
                <span class="text-base-content">Password</span>
              </label>
              <div class="relative">
                <input id="updatePassword" v-model="password" :type="showPassword ? 'text' : 'password'" class="input w-full pr-10" minlength="8" required />
                <button type="button" class="text-base-content/60 hover:text-base-content absolute top-[10px] right-3 cursor-pointer" @click.prevent="showPassword = !showPassword">
                  <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" />
                </button>
              </div>
            </div>

            <div class="mb-4">
              <label for="updateConfirmPassword" class="label mb-1">
                <span class="text-base-content">Confirm Password</span>
              </label>
              <div class="relative">
                <input id="updateConfirmPassword" v-model="showConfirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="input w-full" required />
                <button
                  type="button"
                  class="text-base-content/60 hover:text-base-content absolute top-[10px] right-3 cursor-pointer"
                  @click.prevent="showConfirmPassword = !showConfirmPassword"
                >
                  <Icon :name="showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" />
                </button>
              </div>
            </div>

            <div class="mt-6 text-end">
              <button type="submit" class="btn btn-primary w-full lg:w-auto" :disabled="updatePasswordLoading">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "application",
  middleware: "auth",
});

const user = useSupabaseUser();
const updateLoading = ref(false);
const updatePasswordLoading = ref(false);
const name = ref(user.value?.user_metadata?.name || "");
const email = ref(user.value?.email || "");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

console.log(user.value);

const updateUser = async () => {
  try {
    updateLoading.value = true;
    const { data, error } = await useSupabaseClient().auth.updateUser({
      email: email.value,
      data: {
        name: name.value,
      },
    });

    if (error) {
      useToastify(error.message, {
        type: "error",
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    if (data) {
      useToastify("Profile updated successfully", {
        type: "success",
        theme: "colored",
        position: "top-center",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
  } finally {
    updateLoading.value = false;
  }
};

const updatePassword = async () => {
  try {
    updatePasswordLoading.value = true;
    if (password.value !== confirmPassword.value) {
      useToastify("Passwords do not match", {
        type: "error",
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    const { data, error } = await useSupabaseClient().auth.updateUser({
      password: password.value,
    });

    if (error) {
      useToastify(error.message, {
        type: "error",
        theme: "colored",
        position: "top-center",
      });
      return;
    }

    if (data) {
      useToastify("Password updated successfully", {
        type: "success",
        theme: "colored",
        position: "top-center",
      });
      password.value = "";
      confirmPassword.value = "";
    }
  } catch (error) {
    console.error("Error updating password:", error);
  } finally {
    updatePasswordLoading.value = false;
  }
};
</script>

<style scoped></style>
