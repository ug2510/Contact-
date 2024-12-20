import axios from 'axios'

export default {
  data() {
    return {
      contacts: [],
      dropdownVisible: {},
      pagination: { page: 1, rowsPerPage: 5 },
      showAddContact: false,
      showEditDialog: false,
      showDeleteDialog: false,
      showSuccessDialog: false,
      selectedContact: {},
      columns: [
        { name: 'name', label: 'Name', align: 'left', field: 'name' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'phnumber', label: 'Phone Number', align: 'left', field: 'phnumber' },
        { name: 'action', label: 'Action', align: 'center', field: 'action' },
      ],
    }
  },
  methods: {
    async getContacts() {
      try {
        const response = await axios.get('http://localhost:8080/api/contacts')
        this.contacts = response.data
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    },

    openEditDialog(contact) {
      this.selectedContact = { ...contact }
      this.showEditDialog = true
    },

    async handleContactEdited(updatedContact) {
      try {
        await axios.patch(
          `http://localhost:8080/api/contacts/phone/${updatedContact.phnumber}`,
          updatedContact,
        )
        this.getContacts() 
        this.showEditDialog = false 
      } catch (error) {
        console.error('Error updating contact:', error)
      }
    },

    openDeleteDialog(contact) {
      this.selectedContact = contact 
      this.showDeleteDialog = true 
    },

    async confirmDelete() {
      try {
        await axios.patch(
          `http://localhost:8080/api/contacts/deactivate/${this.selectedContact.phnumber}`,
        )
        this.showDeleteDialog = false 
        this.showSuccessDialog = true 
        this.getContacts() 
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    },

    handleContactSaved() {
      this.getContacts() 
      this.showAddContact = false 
    },
  },
  mounted() {
    this.getContacts() 
  },
}
