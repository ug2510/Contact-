<template>
  <q-page class="q-pa-md">
    <q-card class="my-3 shadow-2 rounded-borders">
      <q-card-section>
        <div class="q-gutter-md q-mb-md">
          <div class="q-gutter-sm row items-center justify-between">
            <h4 class="text-h5 text-weight-bold">Deleted Contacts</h4>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="contacts"
          :columns="columns"
          row-key="id"
          :pagination="pagination"
          :rows-per-page-options="[5, 10, 15]"
          flat
          bordered
          class="q-mb-none table-custom"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props" />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'DeleteView',
  setup() {
    const contacts = ref([])
    const pagination = ref({ page: 1, rowsPerPage: 5 })
    const selectedContact = ref({})

    const columns = [
      { name: 'name', label: 'Name', align: 'left', field: 'name' },
      { name: 'email', label: 'Email', align: 'left', field: 'email' },
      { name: 'phnumber', label: 'Phone Number', align: 'left', field: 'phnumber' },
    ]

    const getContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/contacts/softDelete')
        contacts.value = response.data
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    }

    const confirmDelete = async () => {
      try {
        await axios.patch(
          `http://localhost:8080/api/contacts/deactivate/${selectedContact.value.phnumber}`,
        )
        getContacts()
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }

    getContacts()

    return {
      contacts,
      pagination,
      columns,
      selectedContact,
      confirmDelete,
    }
  },
}
</script>

<style scoped>
.q-card {
  background-color: #fefefe;
}

.table-custom .q-table__header {
  background-color: #4a90e2;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

.q-table__row--hover:hover {
  background-color: #f9fbfd;
}

.btn-pastel-red {
  background-color: #c41212;
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 0;
}

.btn-pastel-red:hover {
  background-color: #ffa7a7;
}

.btn-pastel-green {
  background-color: #75d175;
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 0;
}

.btn-pastel-green:hover {
  background-color: #b8f6b8;
}

.btn-pastel-blue {
  background-color: #c8e4ff;
  color: #175cac;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 0;
}

.btn-pastel-blue:hover {
  background-color: #a7d4ff;
}
</style>
