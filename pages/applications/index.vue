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
            <th>Location</th>
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
            <td>{{ application.location || "-" }}</td>
            <td>
              <div class="badge capitalize" :class="getBadgeColor(application.status)">{{ application.status }}</div>
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
            <td>{{ formatDate(application.date_applied) }}</td>
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
      <div class="modal-box max-h-[90vh] overflow-y-auto">
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
            <label for="view-location" class="label mb-1">
              <span class="text-base-content">Location</span>
            </label>
            <input id="view-location" v-model="currentApplication.location" type="text" class="input w-full" readonly />
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
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="view-interview-type" class="label mb-1">
              <span class="text-base-content">Interview Type</span>
            </label>
            <select id="view-interview-type" v-model="currentApplication.interview_type" class="select pointer-events-none w-full" readonly>
              <option value="not interviewed yet">Not interviewed yet</option>
              <option value="remote">Remote</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>

          <div v-if="currentApplication.interview_type === 'remote'" class="mb-4">
            <label for="view-meeting-link" class="label mb-1">
              <span class="text-base-content">Meeting Link</span>
            </label>
            <input id="view-meeting-link" v-model="currentApplication.meeting_link" type="text" class="input w-full" readonly />
          </div>

          <div class="mb-4">
            <label for="view-date-applied" class="label mb-1">
              <span class="text-base-content">Date Applied</span>
            </label>
            <input id="view-date-applied" v-model="currentApplication.date_applied" type="date" class="input hidden w-full" readonly />
            <p class="input mt-1 w-full text-sm">{{ formatDate(currentApplication.date_applied) }}</p>
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
      <div class="modal-box max-h-[90vh] overflow-y-auto">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Add Application <Icon name="heroicons:plus-circle" size="24" /></h3>
        <div class="mb-4">
          <label for="company-name" class="label mb-1">
            <p class="text-base-content">Company Name <span class="text-red-500">*</span></p>
          </label>
          <input id="company-name" v-model="companyName" type="text" class="input w-full" :class="{ 'border-red-500': errors.companyName }" />
          <p v-if="errors.companyName" class="mt-1 text-sm text-red-500">Company name is required</p>
        </div>

        <div class="mb-4">
          <label for="position" class="label mb-1">
            <p class="text-base-content">Position <span class="text-red-500">*</span></p>
          </label>
          <input id="position" v-model="position" type="text" class="input w-full" :class="{ 'border-red-500': errors.position }" />
          <p v-if="errors.position" class="mt-1 text-sm text-red-500">Position is required</p>
        </div>

        <div class="mb-4">
          <label for="location" class="label mb-1">
            <span class="text-base-content">Location</span>
          </label>
          <input id="location" v-model="location" type="text" class="input w-full" />
        </div>

        <div class="mb-4">
          <label for="status" class="label mb-1">
            <p class="text-base-content">Status <span class="text-red-500">*</span></p>
          </label>
          <select id="status" v-model="status" class="select w-full cursor-pointer" :class="{ 'border-red-500': errors.status }">
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
          <p v-if="errors.status" class="mt-1 text-sm text-red-500">Status is required</p>
        </div>

        <div class="mb-4">
          <label for="interview-type" class="label mb-1">
            <p class="text-base-content">Interview Type <span class="text-red-500">*</span></p>
          </label>
          <select id="interview-type" v-model="interviewType" class="select w-full cursor-pointer" :class="{ 'border-red-500': errors.interviewType }">
            <option value="not interviewed yet">Not interviewed yet</option>
            <option value="remote">Remote</option>
            <option value="in-person">In-Person</option>
          </select>
          <p v-if="errors.interviewType" class="mt-1 text-sm text-red-500">Interview type is required</p>
        </div>

        <div v-if="interviewType === 'remote'" class="mb-4">
          <label for="meeting-link" class="label mb-1">
            <span class="text-base-content">Meeting Link</span>
          </label>
          <input id="meeting-link" v-model="meetingLink" type="text" class="input w-full" />
        </div>

        <div class="mb-4">
          <label for="date-applied" class="label mb-1">
            <span class="text-base-content">Date Applied</span>
          </label>
          <input id="date-applied" v-model="dateApplied" type="date" class="input w-full" />
        </div>

        <div class="mb-4">
          <label for="notes" class="label mb-1">
            <span class="text-base-content">Notes</span>
          </label>
          <textarea id="notes" v-model="notes" class="textarea w-full" rows="4"></textarea>
        </div>

        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn">Close</button>
            <button type="button" class="btn btn-primary" :disabled="addLoading" @click="addApplication">Add Application</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Edit application modal -->
    <dialog ref="editApplicationModal" class="modal">
      <div class="modal-box max-h-[90vh] overflow-y-auto">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Edit Application <Icon name="heroicons:pencil" size="24" /></h3>
        <div v-if="currentApplication">
          <div class="mb-4">
            <label for="edit-company-name" class="label mb-1">
              <span class="text-base-content">Company Name</span>
            </label>
            <input id="edit-company-name" v-model="companyName" type="text" class="input w-full" />
          </div>

          <div class="mb-4">
            <label for="edit-position" class="label mb-1">
              <span class="text-base-content">Position</span>
            </label>
            <input id="edit-position" v-model="position" type="text" class="input w-full" />
          </div>

          <div class="mb-4">
            <label for="edit-location" class="label mb-1">
              <span class="text-base-content">Location</span>
            </label>
            <input id="edit-location" v-model="location" type="text" class="input w-full" />
          </div>

          <div class="mb-4">
            <label for="edit-status" class="label mb-1">
              <span class="text-base-content">Status</span>
            </label>
            <select id="edit-status" v-model="status" class="select w-full">
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="edit-interview-type" class="label mb-1">
              <span class="text-base-content">Interview Type</span>
            </label>
            <select id="edit-interview-type" v-model="editInterviewType" class="select w-full">
              <option value="not interviewed yet">Not interviewed yet</option>
              <option value="remote">Remote</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>

          <div v-if="editInterviewType === 'remote'" class="mb-4">
            <label for="edit-meeting-link" class="label mb-1">
              <span class="text-base-content">Meeting Link</span>
            </label>
            <input id="edit-meeting-link" v-model="meetingLink" type="text" class="input w-full" />
          </div>

          <div class="mb-4">
            <label for="edit-date-applied" class="label mb-1">
              <span class="text-base-content">Date Applied</span>
            </label>
            <input id="edit-date-applied" v-model="dateApplied" type="date" class="input w-full" />
          </div>

          <div class="mb-4">
            <label for="view-notes" class="label mb-1">
              <span class="text-base-content">Notes</span>
            </label>
            <textarea id="edit-notes" v-model="notes" class="textarea w-full" rows="4"></textarea>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn">Close</button>
            <button type="button" class="btn btn-primary" :disabled="editLoading" @click="editApplication">Save Changes</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Delete application modal -->
    <dialog ref="deleteApplicationModal" class="modal">
      <div class="modal-box max-h-[90vh] overflow-y-auto">
        <h3 class="flex items-center justify-between pb-6 text-lg font-bold">Delete Application <Icon name="heroicons:trash" size="24" /></h3>
        <p>Are you sure you want to delete this job application? This action is permanent and cannot be undone.</p>
        <div class="modal-action">
          <form method="dialog" class="space-x-2">
            <button class="btn">Cancel</button>
            <button type="button" class="btn text-primary-content bg-red-600" :disabled="deleteLoading" @click="deleteApplication">Delete</button>
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

interface Database {
  public: {
    Tables: {
      "job applications": {
        Row: Application;
        Insert: {
          company_name: string;
          position: string;
          status: string;
          interview_type: string;
          meeting_link?: string | null;
          date_applied?: string | null;
          notes?: string | null;
          location?: string | null;
        };
      };
    };
  };
}

interface Application {
  id: number;
  company_name: string;
  position: string;
  status: string;
  interview_type: string;
  meeting_link: string | null;
  date_applied: string;
  notes: string | null;
  location: string | null;
}

const supabase = useSupabaseClient<Database>();
const viewModal = ref(null as HTMLDialogElement | null);
const addApplicationModal = ref(null as HTMLDialogElement | null);
const editApplicationModal = ref(null as HTMLDialogElement | null);
const deleteApplicationModal = ref(null as HTMLDialogElement | null);
const currentApplication = ref<Application | null>(null);
const companyName = ref("");
const position = ref("");
const status = ref("applied");
const interviewType = ref("");
const meetingLink = ref("");
const dateApplied = ref(new Date().toISOString().split("T")[0]);
const notes = ref("");
const location = ref("");
const editInterviewType = ref("");
const editLoading = ref(false);
const addLoading = ref(false);
const deleteLoading = ref(false);

const errors = ref({
  companyName: false,
  position: false,
  status: false,
  interviewType: false,
});

const handleViewModal = (app: Application) => {
  currentApplication.value = app;
  viewModal.value?.showModal();
};

const handleAddModal = () => {
  addApplicationModal.value?.showModal();
  errors.value = {
    companyName: false,
    position: false,
    status: false,
    interviewType: false,
  };
};

const handleEditModal = (app: Application) => {
  currentApplication.value = app;
  companyName.value = app.company_name;
  position.value = app.position;
  status.value = app.status;
  editInterviewType.value = app.interview_type;
  meetingLink.value = app.meeting_link || "";
  dateApplied.value = app.date_applied || new Date().toISOString().split("T")[0];
  notes.value = app.notes || "";
  location.value = app.location || "";
  editApplicationModal.value?.showModal();
};

const handleDeleteModal = (app: Application) => {
  currentApplication.value = app;
  deleteApplicationModal.value?.showModal();
};

const getBadgeColor = (status: string) => {
  switch (status) {
    case "applied":
      return "badge-info";
    case "interview":
      return "badge-warning";
    case "offer":
      return "badge-success";
    case "rejected":
      return "badge-error";
    default:
      return "badge-accent";
  }
};

const { data: applications, refresh } = await useAsyncData<Application[]>("application", async () => {
  const { data, error } = await supabase.from("job applications").select("*").order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
});

const addApplication = async () => {
  errors.value = {
    companyName: false,
    position: false,
    status: false,
    interviewType: false,
  };

  let hasErrors = false;
  if (!companyName.value.trim()) {
    errors.value.companyName = true;
    hasErrors = true;
  }
  if (!position.value.trim()) {
    errors.value.position = true;
    hasErrors = true;
  }
  if (!status.value) {
    errors.value.status = true;
    hasErrors = true;
  }
  if (!interviewType.value) {
    errors.value.interviewType = true;
    hasErrors = true;
  }

  if (hasErrors) return;

  addLoading.value = true;

  const { data, error } = await supabase
    .from("job applications")
    .insert([
      {
        company_name: companyName.value,
        position: position.value,
        status: status.value,
        interview_type: interviewType.value,
        meeting_link: meetingLink.value,
        notes: notes.value,
        location: location.value,
        date_applied: dateApplied.value,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  companyName.value = "";
  position.value = "";
  status.value = "applied";
  interviewType.value = "";
  meetingLink.value = "";
  dateApplied.value = new Date().toISOString().split("T")[0];
  notes.value = "";
  location.value = "";

  addLoading.value = false;

  useToastify("Application added successfully", {
    type: "success",
    theme: "colored",
    position: "bottom-right",
  });

  await refresh();

  addApplicationModal.value?.close();
  return data;
};

const editApplication = async () => {
  editLoading.value = true;

  if (!currentApplication.value || !currentApplication.value.id) {
    console.error("No application selected for editing");
    return;
  }

  const applicationId = currentApplication.value.id;

  const updatePayload = {
    company_name: companyName.value.trim(),
    position: position.value.trim(),
    status: status.value,
    interview_type: editInterviewType.value,
    meeting_link: meetingLink.value || null,
    notes: notes.value || null,
    location: location.value || null,
    date_applied: dateApplied.value || null,
  };

  try {
    const { data, error } = await supabase.from("job applications").update(updatePayload).eq("id", applicationId).select();

    if (error) {
      throw new Error(error.message);
    }

    useToastify("Application updated successfully", {
      type: "success",
      theme: "colored",
      position: "bottom-right",
    });

    await refresh();

    editApplicationModal.value?.close();
    return data;
  } catch (err) {
    console.error("Exception during update:", err);
  } finally {
    editLoading.value = false;
  }
};

const deleteApplication = async () => {
  if (!currentApplication.value || !currentApplication.value.id) {
    console.error("No application selected for deletion");
    return;
  }

  const applicationId = currentApplication.value.id;

  deleteLoading.value = true;

  try {
    const { error } = await supabase.from("job applications").delete().eq("id", applicationId);

    if (error) {
      throw new Error(error.message);
    }

    useToastify("Job application deleted successfully", {
      type: "success",
      theme: "colored",
      position: "bottom-right",
    });

    await refresh();
    deleteApplicationModal.value?.close();
  } catch (err) {
    console.error("Exception during deletion:", err);
    useToastify("Failed to delete job application", {
      type: "error",
      theme: "colored",
      position: "bottom-right",
    });
  } finally {
    deleteLoading.value = false;
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
</script>

<style scoped></style>
