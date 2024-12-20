<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="shadow-2 rounded-borders" style="width: 400px">
      <q-card-section>
        <h4 class="text-h6 text-center q-mb-none">Add Contact</h4>
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

          <q-btn label="Save" color="primary" size="md" type="submit" class="full-width" />
          <q-btn
            label="Cancel"
            flat
            color="negative"
            size="md"
            class="full-width q-mt-sm"
            @click="closeModal"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showSuccessDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Success</div>
          <p>{{ successMessage }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="OK" color="primary" @click="closeSuccessDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showErrorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error</div>
          <p>{{ errorMessage }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="OK" color="negative" @click="closeErrorDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import AddContact from './AddContact.js';

export default {
  name: 'AddContact',
  data() {
    return {
      ...AddContact.data(), 
    };
  },
  methods: {
    ...AddContact.methods, 
  },
  watch: {
    ...AddContact.watch, 
  },
};
</script>

<style scoped>
@import './AddContact.css';
</style>
