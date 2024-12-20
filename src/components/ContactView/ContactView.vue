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
          Are you sure you want to delete the contact <strong>{{ selectedContact.name }}</strong>?
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
import AddContact from '../AddContact/AddContact.vue'
import EditContact from '../EditContact/EditContact.vue'
import ContactView from './ContactView.js'  // Import the DeleteView.js script

export default {
  name: 'ContactView',
  components: {
    AddContact,
    EditContact,
  },
  mixins: [ContactView],  // Use the logic from DeleteView.js
}
</script>

<style scoped>
@import './ContactView.css';
</style>
