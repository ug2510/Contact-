<template>
  <q-layout view="hHh lpR fFf">
    <div
      v-if="drawer"
      class="drawer-overlay"
      @click="drawer = false"
    ></div>
    <q-header elevated fixed>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="q-mr-sm" />
        <q-toolbar-title>Directory</q-toolbar-title>
        <q-space />
        <q-form @submit.prevent="searchContact" class="q-gutter-sm q-mb-none">
          <div class="q-gutter-sm row items-center">
            <q-input
              v-model="searchName"
              label="Search Contact"
              outlined
              debounce="300"
              class="q-mr-sm full-width"
              dense
              :style="{ minWidth: '250px', borderRadius: '0px', backgroundColorcolor: white }"
            >
              <template v-slot:append>
                <q-icon name="search" @click="searchContact" />
              </template>
            </q-input>
          </div>
        </q-form>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      :width="230"
      :breakpoint="500"
      overlay
      bordered
      :style="{ backgroundColor: '#ffffff' }"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-section>
            <div class="q-pa-md">
              <q-btn-dropdown class="glossy" color="purple" label="Account Settings">
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Settings</div>
                    <q-btn
                      color="primary"
                      size="lg"
                      label="My Profile"
                      class="q-mb-sm"
                      style="font-size: 0.8rem"
                      @click="My_Profile = true"
                    />
                    <q-dialog v-model="My_Profile">
                      <q-card style="width: 400px; max-width: 90%">
                        <q-card-section>
                          <div class="text-h6 text-center">My Profile</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none q-pb-md">
                          <div class="row items-center no-wrap" style="margin-top: 20px;">
                            <div class="col-8">
                              <p><strong>Name:</strong> {{ username }}</p>
                              <p><strong>Phone:</strong> {{ phnumber }}</p>
                              <p><strong>Address:</strong> {{ address }}</p>
                            </div>

                            <q-separator vertical inset class="q-mx-md" />

                            <div class="col-auto">
                              <q-avatar size="100px">
                                <img
                                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                                  alt="Profile Picture"
                                />
                              </q-avatar>
                            </div>
                          </div>
                        </q-card-section>

                        <q-card-actions align="right">
                          <q-btn flat label="OK" color="primary" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>

                    <q-btn
                      color="negative"
                      size="lg"
                      label="Logout"
                      @click="Logout"
                      style="font-size: 0.8rem"
                    />
                  </div>

                  <q-separator vertical inset class="q-mx-lg" />

                  <div class="column items-center text-center">
                    <q-avatar size="72px" class="q-mb-sm">
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="User Avatar" />
                    </q-avatar>
                    <div class="text-subtitle1 q-mb-xs">{{ username }}</div>
                  </div>
                </div>
              </q-btn-dropdown>
            </div>
          </q-item-section>
          <div class="q-pa-md">
            <q-tree
              :nodes="menuTree"
              node-key="label"
              @click="handleNodeClick"
              class="clickable-tree"
              v-model:selected="selected"
              default-expand-all
            />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-tab-panels v-model="selected" animated transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel name="Home"></q-tab-panel>
        <q-tab-panel name="Contacts"> </q-tab-panel>
        <q-tab-panel name="View Contacts">
          <div class="text-h4 q-mb-md"></div>
        </q-tab-panel>
        <q-tab-panel name="Deleted Contacts">
          <div class="text-h4 q-mb-md"></div>
        </q-tab-panel>
      </q-tab-panels>
      <RouterView />
    </q-page-container>
    <q-dialog v-model="showModal" persistent>
      <q-card class="custom-card">
        <q-btn
          flat
          icon="close"
          @click="showModal = false"
          class="q-absolute top-right"
          color="negative"
        />

        <q-card-section>
          <div class="text-h6">Contact Information</div>
        </q-card-section>

        <q-card-section>
          <q-table
            :rows="contactData"
            :columns="columns"
            row-key="name"
            :pagination="pagination"
            flat
            bordered
            :style="{ 'min-height': '300px' }"
            class="custom-table"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const drawer = ref(true)
const searchName = ref('')
const contactData = ref([])
const showModal = ref(false)
const pagination = ref({ rowsPerPage: 5 })
const My_Profile = ref(false)
const username = ref('')
const address = ref('')
const phnumber = ref('')
const selected = ref('')

const columns = [
  { name: 'name', label: 'Name', align: 'left', field: 'name' },
  { name: 'email', label: 'Email', align: 'left', field: 'email' },
  { name: 'phnumber', label: 'Phone Number', align: 'left', field: 'phnumber' },
]

const menuTree = [
  { id: 1, label: 'Home', icon: 'home', route: '/HomeView' },
  {
    id: 2,
    label: 'Contacts',
    icon: 'contact_page',
    children: [
      { id: 3, label: 'View Contacts', icon: 'visibility', route: '/contact-view' },
      { id: 4, label: 'Deleted Contacts', icon: 'delete', route: '/DeleteView' },
    ],
  },
  { id: 5, label: 'About', icon: 'people', route: '/about' },
  { id: 6, label: 'Send Feedback', icon: 'feedback', route: '/feedback' },
]

const router = useRouter()

onMounted(() => {
  const storedUsername = localStorage.getItem('username')
  const storedAddress = localStorage.getItem('address')
  const storedPhnumber = localStorage.getItem('phnumber')
  if (storedUsername) {
    username.value = storedUsername
    address.value = storedAddress
    phnumber.value = storedPhnumber
  } else {
    username.value = 'Guest'
  }
})

const searchContact = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/contacts/name/${searchName.value}`)
    if (response.data.length > 0) {
      contactData.value = response.data
      showModal.value = true
    } else {
      alert('No contacts found for the given search term.')
    }
  } catch (error) {
    console.error('Error fetching contact:', error)
    alert('Failed to search for contacts.')
  }
}

const Logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('username')
  localStorage.removeItem('address')
  localStorage.removeItem('phnumber')
  router.push('/')
}

const navigateToRoute = (label) => {
  const findRoute = (nodes, label) => {
    for (const node of nodes) {
      if (node.label === label) {
        return node.route
      }
      if (node.children) {
        const route = findRoute(node.children, label)
        if (route) return route
      }
    }
    return null
  }

  const route = findRoute(menuTree, label)
  if (route) {
    router.push(route)
  } else {
    console.warn(`No route found for label: ${label}`)
  }
}

const handleNodeClick = (node) => {
  if (node.label) {
    selected.value = node.label
    navigateToRoute(node.label)
  }
}

watch(selected, (newValue) => {
  navigateToRoute(newValue)
})
</script>

<style scoped>
.q-header {
  background-color: #6417e9;
  /* border-bottom: 1px solid #eaeaea; */
  /* box-shadow: 0px 4px 10px rgba(203, 185, 185, 0.1); */
  padding: 13px;
  z-index: 10;
}
.q-input {
  background-color: rgb(250, 250, 250);
  border-color: white;
}

.clickable-tree .q-tree__node--label {
  cursor: pointer;
}

.custom-table .q-table__header {
  background-color: #1c4c76 !important;
  color: #333 !important;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4); 
  z-index: 998; 
  transition: opacity 0.3s;
}

/* .custom-table .q-table__header th {
  font-weight: bold !important;
} */

.custom-table .q-table__pagination {
  background-color: #4fa4ef !important;
  color: #333 !important;
}

.custom-table .q-table__pagination .q-btn {
  background-color: #80bfff !important;
  color: white !important;
}

.custom-table .q-table__pagination .q-btn:hover {
  background-color: #66a3cc !important;
}

.router-link {
  text-decoration: none;
  color: inherit;
}

.router-link q-item {
  display: block;
}

.router-link:hover {
  text-decoration: none;
}

.custom-table .q-table th,
.custom-table .q-table td {
  font-size: 1rem !important;
  padding: 10px !important;
}

.custom-table .q-table__cell {
  word-wrap: break-word;
  white-space: normal;
}

.custom-card {
  width: 60vw;
  max-width: 40px;
}

.q-card-section {
  padding: 20px;
}

.q-btn.flat {
  font-size: 24px;
}

.q-btn.flat.top-right {
  top: 12px;
  right: 10px;
  position: absolute;
}

.q-btn {
  height: 36px;
}

.q-btn.primary {
  background-color: #2d87f0;
  color: white;
}

.q-btn.primary:hover {
  background-color: #2578c6;
}

.q-card {
  width: 80vw;
  max-width: 1000px;
}

.q-card-section {
  padding: 20px;
}

@media (max-width: 600px) {
  .q-btn {
    width: 100%;
  }

  .q-input {
    width: 100%;
  }
}
</style>
