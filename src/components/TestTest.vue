<template>
    <q-layout view="lHh Lpr lFf">
      <!-- Drawer -->
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
            <!-- Account Settings Dropdown -->
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
                        <q-card>
                          <q-card-section>
                            <div class="text-h6">My Profile</div>
                          </q-card-section>
                          <q-card-section class="q-pt-none">
                            <div>
                              <p>Name: {{ username }}</p>
                              <p>Phone number: {{ phnumber }}</p>
                              <p>Address: {{ address }}</p>
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
  
      <!-- Main Tab Panels -->
      <q-page-container>
        <q-tab-panels v-model="selected" animated>
          <q-tab-panel name="Food">
            <div class="q-pa-md">
              <h4>Food</h4>
              <p>Welcome to the Food section!</p>
            </div>
          </q-tab-panel>
          <q-tab-panel name="Room service">
            <div class="q-pa-md">
              <h4>Room Service</h4>
              <p>Details about our room service options.</p>
            </div>
          </q-tab-panel>
          <q-tab-panel name="Room view">
            <div class="q-pa-md">
              <h4>Room View</h4>
              <p>Explore the available room views here.</p>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const drawer = ref(true);
    const My_Profile = ref(false);
    const username = ref("John Doe");
    const phnumber = ref("123-456-7890");
    const address = ref("123 Main St, Springfield");
    const selected = ref("Food"); // Default selected panel
    const router = useRouter();

    // Menu tree structure
    const menuTree = [
      {
        id: "1",
        label: "Relax Hotel",
        children: [
          { id: "2", label: "Food", icon: "restaurant_menu", route: "/HomeView" },
          { id: "3", label: "Room service", icon: "room_service", route: "/room-service" },
          { id: "4", label: "Room view", icon: "photo", route: "/room-view" },
        ],
      },
    ];

    const navigateToRoute = (label) => {
     
        const route = menuTree[0].children.find((item) => item.label === label)?.route;
        if (route) {
          router.push(route);
        }
      
    };
    const handleNodeClick = (node) => {
      if (node.label) {
        selected.value = node.label;
        navigateToRoute(node.label);
      }
    };
    watch(selected, (newValue) => {
      navigateToRoute(newValue);
    });

    const Logout = () => {
      console.log("Logout Clicked");
    };

    return {
      drawer,
      My_Profile,
      username,
      phnumber,
      address,
      menuTree,
      selected,
      handleNodeClick,
      Logout,
    };
  },
};
</script>
