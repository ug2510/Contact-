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
              :rules="[val => !!val || 'Number is required']"
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
              :error="confirmPassword && confirmPassword !== password"
              error-message="Passwords do not match"
              :rules="[val => !!val || 'Confirm your password']"
            />
            <q-btn label="Sign Up" color="primary" class="full-width" type="submit" />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import Swal from 'sweetalert2';
  import { useRouter } from 'vue-router'; 

const router = useRouter();
  
  const name = ref("");
  const number = ref("");
  const email = ref(""); 
  const address = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  
  const handleSignUp = async () => {
    if (!name.value || !number.value || !address.value || !password.value || !confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required.",
      });
      return;
    }
  
    if (password.value !== confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/contacts/user', {
        name: name.value,
        email: email.value,
        phnumber: number.value,
        address: address.value,
        password: password.value
      });
  
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Signed Up!",
          text: "Your account has been created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push('/'); 
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: "There was an error creating your account.",
      });
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
  
  .q-btn img {
    display: inline-block;
    vertical-align: middle;
  }
  
  .q-form {
    width: 100%;
  }
  </style>
  