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

    <section v-if="applications?.length" class="rounded-box border-base-content/5 bg-base-100 mt-8 overflow-x-auto border">
      <table class="table-zebra table">
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
          <tr v-for="application in applications" :key="application.id">
            <td>
              <p>{{ application.company_name }}</p>
            </td>
            <td>{{ application.position }}</td>
            <td>
              <div class="badge badge-info capitalize">{{ application.status }}</div>
            </td>
            <td>
              <p class="capitalize">{{ application.interview_type }}</p>
            </td>
            <td>
              <NuxtLink v-if="application.meeting_link" :to="application.meeting_link" class="text-blue-600 hover:underline" target="_blank">
                {{ application.meeting_link }}
              </NuxtLink>
              <span v-else>-</span>
            </td>
            <td>{{ application.date_applied }}</td>
            <td class="flex items-center">
              <button class="btn btn-ghost" @click="() => handleViewModal(application)">
                <Icon name="heroicons:eye" size="20" />
              </button>
              <button class="btn btn-ghost" @click="() => handleEditModal(application)">
                <Icon name="heroicons:pencil" size="20" />
              </button>
              <button class="btn btn-ghost" @click="() => handleDeleteModal(application)">
                <Icon name="heroicons:trash" size="20" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-else class="flex min-h-[75vh] flex-col items-center justify-center">
      <Icon name="heroicons:clipboard-document-list" size="84" />
      <p class="w-full pt-6 text-center sm:w-1/2 xl:w-1/4">You don't have any job applications yet. Add one by clicking the Add Application button.</p>
    </section>

    <!-- View application modal -->
    <dialog ref="viewModal" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Application Details <Icon name="heroicons:eye" size="24" /></h3>
        <div v-if="currentApplication">
          <div class="mb-4">
            <label for="view-company-name" class="label mb-1">
              <span class="text-base-content">Company Name</span>
            </label>
            <input id="view-company-name" v-model="currentApplication.company_name" type="text" class="input w-full" readonly />
          </div>
          <div class="mb-4">
            <label for="view-position" class="label mb-1">
              <span class="text-base-content">Position</span>
            </label>
            <input id="view-position" v-model="currentApplication.position" type="text" class="input w-full" readonly />
          </div>
          <div class="mb-4">
            <label for="view-status" class="label mb-1">
              <span class="text-base-content">Status</span>
            </label>
            <select id="view-status" v-model="currentApplication.status" class="select pointer-events-none w-full" readonly>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="view-interview-type" class="label mb-1">
              <span class="text-base-content">Interview Type</span>
            </label>
            <select id="view-interview-type" v-model="currentApplication.interview_type" class="select pointer-events-none w-full" readonly>
              <option value="remote">Remote</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="view-meeting-link" class="label mb-1">
              <span class="text-base-content">Meeting Link</span>
            </label>
            <input id="view-meeting-link" v-model="currentApplication.meeting_link" type="text" class="input w-full" readonly />
          </div>
          <div class="mb-4">
            <label for="view-date-applied" class="label mb-1">
              <span class="text-base-content">Date Applied</span>
            </label>
            <input id="view-date-applied" v-model="currentApplication.date_applied" type="date" class="input w-full" readonly />
          </div>
          <div class="mb-4">
            <label for="view-notes" class="label mb-1">
              <span class="text-base-content">Notes</span>
            </label>
            <textarea id="view-notes" v-model="currentApplication.notes" class="textarea w-full" rows="4" readonly></textarea>
          </div>
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
            <p class="text-base-content">Company Name <span class="text-red-500">*</span></p>
          </label>
          <input id="company-name" type="text" class="input w-full" required />
        </div>
        <div class="mb-4">
          <label for="position" class="label mb-1">
            <p class="text-base-content">Position <span class="text-red-500">*</span></p>
          </label>
          <input id="position" type="text" class="input w-full" required />
        </div>
        <div class="mb-4">
          <label for="status" class="label mb-1">
            <p class="text-base-content">Status <span class="text-red-500">*</span></p>
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
            <p class="text-base-content">Interview Type <span class="text-red-500">*</span></p>
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
            <button type="button" class="btn btn-primary" @click="addApplication">Add Application</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Edit application modal -->
    <dialog ref="editApplicationModal" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Edit Application <Icon name="heroicons:pencil" size="24" /></h3>
        <div v-if="currentApplication">
          <div class="mb-4">
            <label for="view-company-name" class="label mb-1">
              <span class="text-base-content">Company Name</span>
            </label>
            <input id="view-company-name" :value="currentApplication.company_name" type="text" class="input w-full" />
          </div>
          <div class="mb-4">
            <label for="view-position" class="label mb-1">
              <span class="text-base-content">Position</span>
            </label>
            <input id="view-position" :value="currentApplication.position" type="text" class="input w-full" />
          </div>
          <div class="mb-4">
            <label for="view-status" class="label mb-1">
              <span class="text-base-content">Status</span>
            </label>
            <select id="view-status" :value="currentApplication.status" class="select w-full">
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="view-interview-type" class="label mb-1">
              <span class="text-base-content">Interview Type</span>
            </label>
            <select id="view-interview-type" :value="currentApplication.interview_type" class="select w-full">
              <option value="remote">Remote</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="view-meeting-link" class="label mb-1">
              <span class="text-base-content">Meeting Link</span>
            </label>
            <input id="view-meeting-link" :value="currentApplication.meeting_link" type="text" class="input w-full" />
          </div>
          <div class="mb-4">
            <label for="view-date-applied" class="label mb-1">
              <span class="text-base-content">Date Applied</span>
            </label>
            <input id="view-date-applied" :value="currentApplication.date_applied" type="date" class="input w-full" />
          </div>
          <div class="mb-4">
            <label for="view-notes" class="label mb-1">
              <span class="text-base-content">Notes</span>
            </label>
            <textarea id="view-notes" :value="currentApplication.notes" class="textarea w-full" rows="4"></textarea>
          </div>
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

interface Application {
  id: number;
  company_name: string;
  position: string;
  status: string;
  interview_type: string;
  meeting_link: string | null;
  date_applied: string;
  notes: string | null;
}

const supabase = useSupabaseClient();
const viewModal = ref(null as HTMLDialogElement | null);
const addApplicationModal = ref(null as HTMLDialogElement | null);
const editApplicationModal = ref(null as HTMLDialogElement | null);
const deleteApplicationModal = ref(null as HTMLDialogElement | null);
const currentApplication = ref<Application | null>(null);

const handleViewModal = (app: Application) => {
  currentApplication.value = app;
  viewModal.value?.showModal();
};

const handleAddModal = () => {
  addApplicationModal.value?.showModal();
};

const handleEditModal = (app: Application) => {
  currentApplication.value = app;
  editApplicationModal.value?.showModal();
};

const handleDeleteModal = (app: Application) => {
  currentApplication.value = app;
  deleteApplicationModal.value?.showModal();
};

const { data: applications } = await useAsyncData<Application[]>("application", async () => {
  const { data, error } = await supabase.from("job applications").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

const addApplication = () => {
  alert("Application added");
};
</script>

<style scoped></style>
