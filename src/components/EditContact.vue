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
  </q-page>
</template>

<script>
import { reactive, watch } from "vue";

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
    watch(
      () => props.contact,
      (newContact) => {
        if (newContact) {
          model.contact = { ...newContact }; 
        }
      },
      { immediate: true } 
    );

    const saveContact = async () => {
      if (!model.contact.name || !model.contact.email || !model.contact.phnumber) {
        return; 
      }

      emit("contact-saved", model.contact); 
    };

    return {
      model,
      saveContact,
    };
  },
};
</script>


<style scoped>
.full-width {
  max-width: 400px;
  width: 100%;
}

.q-banner {
  margin-top: 20px;
}

.q-card {
  margin: auto;
}

.q-card-section h4 {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
