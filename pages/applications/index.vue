<!-- eslint-disable vue/html-self-closing -->
<template>
  <section>
    <div class="flex flex-col justify-between sm:flex-row sm:items-center">
      <h1 class="pb-4 text-2xl font-bold sm:pb-0">My Applications</h1>
      <button class="btn btn-primary" @click="handleAddModal">
        <Icon name="ph:plus" class="text-primary-content" size="20" />
        <span class="ml-2">Add Application</span>
      </button>
    </div>

    <div class="rounded-box border-base-content/5 bg-base-100 mt-8 overflow-x-auto border">
      <table class="table-zebra table">
        <!-- head -->
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Position</th>
            <th>Status</th>
            <th>Interview Type</th>
            <th>Meeting Link</th>
            <th>Date Applied</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <td>
              <p>JobNest</p>
            </td>
            <td>Software Engineer</td>
            <td>
              <div class="badge badge-info">Applied</div>
            </td>
            <td>Remote</td>
            <td>
              <NuxtLink to="/applications" class="text-blue-600 hover:underline" target="_blank">https://meet.google.com/xyz</NuxtLink>
            </td>
            <td>2023-10-01</td>
            <td class="flex items-center">
              <button class="btn btn-ghost" @click="handleViewModal">
                <Icon name="heroicons:eye" size="20" />
              </button>
              <button class="btn btn-ghost" @click="handleEditModal">
                <Icon name="heroicons:pencil" size="20" />
              </button>
              <button class="btn btn-ghost" @click="handleDeleteModal">
                <Icon name="heroicons:trash" size="20" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View application modal -->
    <dialog ref="viewModal" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Application Details <Icon name="heroicons:eye" size="24" /></h3>
        <div class="mb-4">
          <label for="email" class="label mb-1">
            <span class="text-base-content">Company Name</span>
          </label>
          <input id="email" type="email" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="position" class="label mb-1">
            <span class="text-base-content">Position</span>
          </label>
          <input id="position" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="status" class="label mb-1">
            <span class="text-base-content">Status</span>
          </label>
          <select id="status" class="select w-full">
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="interview-type" class="label mb-1">
            <span class="text-base-content">Interview Type</span>
          </label>
          <select id="interview-type" class="select w-full">
            <option value="remote">Remote</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="meeting-link" class="label mb-1">
            <span class="text-base-content">Meeting Link</span>
          </label>
          <input id="meeting-link" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="date-applied" class="label mb-1">
            <span class="text-base-content">Date Applied</span>
          </label>
          <input id="date-applied" type="date" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="notes" class="label mb-1">
            <span class="text-base-content">Notes</span>
          </label>
          <textarea id="notes" class="textarea w-full" rows="4"></textarea>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Add application modal -->
    <dialog ref="addApplicationModal" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Add Application <Icon name="heroicons:plus-circle" size="24" /></h3>
        <div class="mb-4">
          <label for="company-name" class="label mb-1">
            <span class="text-base-content">Company Name</span>
          </label>
          <input id="company-name" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="position" class="label mb-1">
            <span class="text-base-content">Position</span>
          </label>
          <input id="position" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="status" class="label mb-1">
            <span class="text-base-content">Status</span>
          </label>
          <select id="status" class="select w-full">
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="interview-type" class="label mb-1">
            <span class="text-base-content">Interview Type</span>
          </label>
          <select id="interview-type" class="select w-full">
            <option value="remote">Remote</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="meeting-link" class="label mb-1">
            <span class="text-base-content">Meeting Link</span>
          </label>
          <input id="meeting-link" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="date-applied" class="label mb-1">
            <span class="text-base-content">Date Applied</span>
          </label>
          <input id="date-applied" type="date" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="notes" class="label mb-1">
            <span class="text-base-content">Notes</span>
          </label>
          <textarea id="notes" class="textarea w-full" rows="4"></textarea>
        </div>
        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn">Close</button>
            <button class="btn btn-primary">Add Application</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Edit application modal -->
    <dialog ref="editApplicationModal" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Edit Application <Icon name="heroicons:pencil" size="24" /></h3>
        <div class="mb-4">
          <label for="company-name" class="label mb-1">
            <span class="text-base-content">Company Name</span>
          </label>
          <input id="company-name" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="position" class="label mb-1">
            <span class="text-base-content">Position</span>
          </label>
          <input id="position" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="status" class="label mb-1">
            <span class="text-base-content">Status</span>
          </label>
          <select id="status" class="select w-full">
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="interview-type" class="label mb-1">
            <span class="text-base-content">Interview Type</span>
          </label>
          <select id="interview-type" class="select w-full">
            <option value="remote">Remote</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="meeting-link" class="label mb-1">
            <span class="text-base-content">Meeting Link</span>
          </label>
          <input id="meeting-link" type="text" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="date-applied" class="label mb-1">
            <span class="text-base-content">Date Applied</span>
          </label>
          <input id="date-applied" type="date" class="input w-full" />
        </div>
        <div class="mb-4">
          <label for="notes" class="label mb-1">
            <span class="text-base-content">Notes</span>
          </label>
          <textarea id="notes" class="textarea w-full" rows="4"></textarea>
        </div>
        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn">Close</button>
            <button class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Delete application modal -->
    <dialog ref="deleteApplicationModal" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Delete Application <Icon name="heroicons:trash" size="24" /></h3>
        <p>Are you sure you want to delete this application?</p>
        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn">Cancel</button>
            <button class="btn text-primary-content bg-red-600">Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "application",
  middleware: "auth",
});

const viewModal = ref(null as HTMLDialogElement | null);
const addApplicationModal = ref(null as HTMLDialogElement | null);
const editApplicationModal = ref(null as HTMLDialogElement | null);
const deleteApplicationModal = ref(null as HTMLDialogElement | null);

const handleViewModal = () => {
  viewModal.value?.showModal();
};

const handleAddModal = () => {
  addApplicationModal.value?.showModal();
};

const handleEditModal = () => {
  editApplicationModal.value?.showModal();
};

const handleDeleteModal = () => {
  deleteApplicationModal.value?.showModal();
};
</script>

<style scoped></style>
