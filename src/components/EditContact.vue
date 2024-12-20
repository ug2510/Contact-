<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="shadow-2 rounded-borders" style="width: 400px">
      <q-card-section>
        <h4 class="text-h6 text-center q-mb-md">Edit Contact</h4>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="saveContact">
          <q-input
            v-model="model.contact.name"
            label="Name"
            outlined
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Name is required']"
          />
          <q-input
            v-model="model.contact.email"
            label="Email"
            type="email"
            outlined
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Email is required']"
          />
          <q-input
            v-model="model.contact.phnumber"
            label="Phone Number"
            type="tel"
            outlined
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Phone Number is required']"
          />

          <q-btn
            label="Save"
            color="primary"
            size="md"
            type="submit"
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Error Dialog -->
    <q-dialog v-model="errorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Validation Error</div>
        </q-card-section>
        <q-card-section>
          <p>{{ errorMessage }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="errorDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { reactive, ref, watch } from "vue";

export default {
  name: "EditContact",
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const model = reactive({
      contact: {
        name: "",
        email: "",
        phnumber: "",
      },
    });

    const errorDialog = ref(false);
    const errorMessage = ref("");

    watch(
      () => props.contact,
      (newContact) => {
        if (newContact) {
          model.contact = { ...newContact };
        }
      },
      { immediate: true }
    );

    const saveContact = () => {
      // Perform frontend validation
      if (!model.contact.name.trim()) {
        errorMessage.value = "Name must not be empty or contain only spaces.";
        errorDialog.value = true;
        return;
      }

      if (!model.contact.email) {
        errorMessage.value = "Email is required.";
        errorDialog.value = true;
        return;
      }

      if (!model.contact.phnumber) {
        errorMessage.value = "Phone Number is required.";
        errorDialog.value = true;
        return;
      }

      // Emit the save event if all validations pass
      emit("contact-saved", model.contact);
    };

    return {
      model,
      saveContact,
      errorDialog,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.full-width {
  max-width: 400px;
  width: 100%;
}

.q-card {
  margin: auto;
}

.q-card-section h4 {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
