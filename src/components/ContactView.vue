<template>
  <q-page class="q-pa-md">
    <q-card class="my-3 shadow-2 rounded-borders">
      <q-card-section>
        <div class="q-gutter-md q-mb-md">
          <div class="q-gutter-sm row items-center justify-between">
            <h4 class="text-h5 text-weight-bold">Contacts</h4>
            <q-btn
              color="primary"
              icon="add_ic_call"
              label="Add Contact"
              @click="showAddContact = true"
            />
          </div>
        </div>
        <q-dialog v-model="showAddContact" persistent>
          <q-card style="min-width: 400px">
            <q-card-section>
              <AddContact @contact-saved="handleContactSaved" @close="showAddContact = false" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="contacts"
          :columns="columns"
          row-key="phnumber"
          :pagination="pagination"
          :rows-per-page-options="[5, 10, 15]"
          flat
          bordered
          class="q-mb-none table-custom"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="q-gutter-sm row items-center justify-center">
                <q-btn flat round icon="more_vert">
                  <q-menu v-model="dropdownVisible[props.row.phnumber]" auto-close>
                    <q-list>
                      <q-item>
                        <q-item-section>
                          <q-btn
                            style="font-size: 12px"
                            color="green"
                            icon="edit"
                            label="edit"
                            flat
                            round
                            @click="openEditDialog(props.row)"
                          />
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item>
                        <q-item-section>
                          <q-btn
                            style="font-size: 12px"
                            flat
                            round
                            color="negative"
                            icon="delete"
                            label="delete"
                            @click="openDeleteDialog(props.row)"
                          />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showEditDialog" persistent>
      <q-card style="min-width: 400px">
          
        <q-card-section>
          <q-btn flat round dense icon="close" @click="showEditDialog = false" aria-label="Close" />
          <EditContact
            :contact="selectedContact"
            @contact-saved="handleContactEdited"
            @close="showEditDialog = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Confirm Deletion</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Are you sure you want to delete the contact <strong>{{ selectedContact.name }}</strong
          >?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showSuccessDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Success</div>
          <p>
            Contact <strong>{{ selectedContact.name }}</strong> has been successfully deleted.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { ref, reactive } from 'vue'
import axios from 'axios'
import AddContact from './AddContact.vue'
import EditContact from './EditContact.vue'

export default {
  name: 'ContactView',
  components: {
    AddContact,
    EditContact,
  },
  setup() {
    const contacts = ref([])
    const dropdownVisible = reactive({})
    const pagination = ref({ page: 1, rowsPerPage: 5 })

    const showAddContact = ref(false)
    const showEditDialog = ref(false)
    const showDeleteDialog = ref(false)
    const showSuccessDialog = ref(false)
    const selectedContact = ref({}) 

    const columns = [
      { name: 'name', label: 'Name', align: 'left', field: 'name' },
      { name: 'email', label: 'Email', align: 'left', field: 'email' },
      { name: 'phnumber', label: 'Phone Number', align: 'left', field: 'phnumber' },
      { name: 'action', label: 'Action', align: 'center', field: 'action' },
    ]

    const getContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/contacts')
        contacts.value = response.data
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    }

    const openEditDialog = (contact) => {
      // console.log(selectedContact.value)
      selectedContact.value = { ...contact }
      showEditDialog.value = true
    }

    const handleContactEdited = async (updatedContact) => {
      try {
        await axios.patch(
          `http://localhost:8080/api/contacts/phone/${updatedContact.phnumber}`,
          updatedContact,
        )
        getContacts()
        showEditDialog.value = false
      } catch (error) {
        console.error('Error updating contact:', error)
      }
    }

    // const handleContactEdited = () => {
    //   getContacts()
    //   showEditDialog.value = false
    // }

    const openDeleteDialog = (contact) => {
      selectedContact.value = contact
      showDeleteDialog.value = true
    }

    const confirmDelete = async () => {
      try {
        await axios.patch(
          `http://localhost:8080/api/contacts/deactivate/${selectedContact.value.phnumber}`,
        )
        showDeleteDialog.value = false
        showSuccessDialog.value = true
        getContacts()
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }
    const handleContactSaved = () => {
      getContacts()
      showAddContact.value = false
    }

    getContacts()

    return {
      contacts,
      pagination,
      columns,
      showAddContact,
      showEditDialog,
      showDeleteDialog,
      showSuccessDialog,
      selectedContact,
      dropdownVisible,
      openEditDialog,
      handleContactEdited,
      openDeleteDialog,
      confirmDelete,
      handleContactSaved,
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
