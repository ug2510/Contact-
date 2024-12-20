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

<script>
 import SignUp from './SignUp'
 export default {
  name: 'SignUpView',
  data() {
    return {
      ...SignUp.data(), 
    };
  },
  methods: {
    ...SignUp.methods, 
  },
};
</script>


<style scoped>
@import './SignUp.css';
</style>
