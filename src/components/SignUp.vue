<template>
  <div class="q-pa-md flex flex-center">
    <q-card class="shadow-2 rounded-borders" style="width: 400px">
      <q-card-section>
        <h4 class="text-h6 text-center q-mb-md">Sign Up</h4>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSignUp">
          <q-input
            outlined
            v-model="name"
            label="Name"
            :rules="[val => !!val || 'Name is required']"
          />
          <q-input
            outlined
            v-model="number"
            label="Phone Number"
            :rules="[val => !!val || 'Phone number is required']"
          />
          <q-input
            outlined
            v-model="address"
            label="Address"
            :rules="[val => !!val || 'Address is required']"
          />
          <q-input
            outlined
            v-model="email"
            label="Email"
            :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Please enter a valid email address']"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="password"
            type="password"
            label="Password"
            hint="Use at least 8 characters."
            maxlength="16"
            :rules="[val => val && val.length >= 8 || 'Password must be at least 8 characters.']"
          />
          <q-input
            outlined
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            :error="confirmPasswordTouched && confirmPassword !== password"
            error-message="Passwords do not match"
            @focus="confirmPasswordTouched = true"
            :rules="[val => !!val || 'Confirm your password']"
          />
          <div class="flex justify-center q-mt-md">
            <q-btn
              label="Sign Up"
              color="primary"
              class="full-width q-pa-sm text-bold"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ dialogTitle }}</div>
        </q-card-section>

        <q-card-section>
          <p>{{ dialogMessage }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="dialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const router = useRouter();

const name = ref("");
const number = ref("");
const email = ref("");
const address = ref("");
const password = ref("");
const confirmPassword = ref("");
const confirmPasswordTouched = ref(false);

const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogMessage = ref("");

const showDialog = (title, message) => {
  dialogTitle.value = title;
  dialogMessage.value = message;
  dialogVisible.value = true;
};

const handleSignUp = async () => {
  if (!name.value || !number.value || !address.value || !password.value || !confirmPassword.value) {
    showDialog("Validation Error", "All fields are required.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    showDialog("Password Mismatch", "Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/contacts/user', {
      name: name.value,
      email: email.value,
      phnumber: number.value,
      address: address.value,
      password: password.value,
    });

    if (response.data.success) {
      showDialog("Signed Up!", "Your account has been created successfully.");
      setTimeout(() => router.push('/'), 1500); // Navigate after showing the dialog
    } else {
      showDialog("Sign Up Failed", response.data.message || "There was an error creating your account.");
    }
  } catch (error) {
    console.error("Error during sign up:", error);

    let errorMessage = "There was an error creating your account.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    showDialog("Sign Up Failed", errorMessage);
  }
};
</script>

<style scoped>
.full-width {
  width: 100%;
}

.q-card {
  margin: auto;
}

.q-form {
  width: 100%;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.q-pa-sm {
  padding: 8px;
}

.text-bold {
  font-weight: bold;
}
</style>
