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
import { ref, watch, defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'AddContact',
  props: {
    contact: {
      type: Object,
      default: () => ({ name: '', email: '', phnumber: '' }),
    },
  },
  setup(props, { emit }) {
    const model = ref({
      contact: { ...props.contact },
    })
    const successMessage = ref('')
    const errorMessage = ref('')
    const showSuccessDialog = ref(false)
    const showErrorDialog = ref(false)

    watch(
      () => props.contact,
      (newContact) => {
        model.value.contact = { ...newContact }
      },
      { immediate: true },
    )

    const closeModal = () => {
      model.value.contact = { name: '', email: '', phnumber: '' }
      successMessage.value = ''
      errorMessage.value = ''
      emit('close') 
    }

    const closeSuccessDialog = () => {
      showSuccessDialog.value = false
      closeModal()
    }

    const closeErrorDialog = () => {
      showErrorDialog.value = false
    }

    const saveContact = async () => {
      successMessage.value = ''
      errorMessage.value = ''

      if (
        !model.value.contact.name ||
        !model.value.contact.email ||
        !model.value.contact.phnumber
      ) {
        errorMessage.value = 'All fields are required.'
        showErrorDialog.value = true
        return
      }

      try {
        const response = await axios.post('http://localhost:8080/api/contacts', model.value.contact)

        if (response.data.success) {
          successMessage.value = response.data.message || 'Contact saved successfully!'
          showSuccessDialog.value = true
          emit('contact-saved', response.data.contact) // Notify parent
        } else {
          throw new Error(response.data.message || 'An unexpected error occurred.')
        }
      } catch (error) {
        errorMessage.value =
          error.response?.data?.message || 'Failed to save contact. Please try again.'
        showErrorDialog.value = true
        console.error('Error saving contact:', error)
      }
    }

    return {
      model,
      successMessage,
      errorMessage,
      saveContact,
      closeModal,
      showSuccessDialog,
      showErrorDialog,
      closeSuccessDialog,
      closeErrorDialog,
    }
  },
})
</script>

<style scoped>
.full-width {
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
