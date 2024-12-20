import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  components: {},

  props: {
    contact: {
      type: Object,
      default: () => ({ name: '', email: '', phnumber: '' }),
    },
  },

  data() {
    return {
      model: {
        contact: { ...this.contact },
      },
      successMessage: '',
      errorMessage: '',
      showSuccessDialog: false,
      showErrorDialog: false,
    }
  },

  watch: {
    contact(newContact) {
      this.model.contact = { ...newContact }
    },
  },

  methods: {
    closeModal() {
      this.model.contact = { name: '', email: '', phnumber: '' }
      this.successMessage = ''
      this.errorMessage = ''
      this.$emit('close')
    },

    closeSuccessDialog() {
      this.showSuccessDialog = false
      this.closeModal()
    },

    closeErrorDialog() {
      this.showErrorDialog = false
    },

    async saveContact() {
      this.successMessage = ''
      this.errorMessage = ''

      if (!this.model.contact.name || !this.model.contact.email || !this.model.contact.phnumber) {
        this.errorMessage = 'All fields are required.'
        this.showErrorDialog = true
        return
      }

      try {
        const token = localStorage.getItem('authToken')
        const response = await axios.post(
          'http://localhost:8080/api/contacts',
          this.model.contact,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.data.success) {
          this.successMessage = response.data.message || 'Contact saved successfully!'
          this.showSuccessDialog = true
          this.$emit('contact-saved', response.data.contact)
        } else {
          throw new Error(response.data.message || 'An unexpected error occurred.')
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || 'Failed to save contact. Please try again.'
        this.showErrorDialog = true
        console.error('Error saving contact:', error)
      }
    },
  },
})