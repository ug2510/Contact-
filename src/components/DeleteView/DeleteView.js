import axios from 'axios'

export default {
  name: 'DeleteView',
  data() {
    return {
      contacts: [],
      pagination: { page: 1, rowsPerPage: 5 },
      selectedContact: {},
      columns: [
        { name: 'name', label: 'Name', align: 'left', field: 'name' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'phnumber', label: 'Phone Number', align: 'left', field: 'phnumber' },
      ],
    }
  },
  methods: {
    async getContacts() {
      try {
        const response = await axios.get('http://localhost:8080/api/contacts/softDelete')
        this.contacts = response.data
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    },

    async confirmDelete() {
      try {
        await axios.patch(
          `http://localhost:8080/api/contacts/deactivate/${this.selectedContact.phnumber}`,
        )
        this.getContacts()
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    },
  },
  mounted() {
    this.getContacts()
  },
}
