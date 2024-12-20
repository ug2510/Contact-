<template>
  <div class="login-container">
    <div class="login-image">
      <img src="./phone-book.jpg" alt="Login Image" />
    </div>
    <div class="login-form-container">
      <q-card flat bordered class="q-pa-md full-height">
        <q-card-section>
          <h3 class="text-center q-mb-md">Login</h3>
          <q-form class="form-container" @submit="handleLogin">
            <q-input
              outlined
              v-model="email"
              label="Email"
              class="q-mb-md form-field"
              :rules="[(val) => !!val || 'Email is required']"
              clearable
            />
            <q-input
              outlined
              v-model="password"
              label="Password"
              type="password"
              class="q-mb-md form-field"
              :rules="[(val) => !!val || 'Password is required']"
              clearable
            />
            <q-btn
              label="Login"
              color="primary"
              class="q-mb-md form-field"
              type="submit"
              :disable="!email || !password"
            />
          </q-form>
        </q-card-section>
        <q-card-section class="text-center signup-option">
          <p>
            Don't have an account?
            <q-btn flat color="primary" @click="navigateToSignUp">Sign Up</q-btn>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router"; 
import { useQuasar } from "quasar"; 
import useLogin from './LoginPage'; 

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');

    const router = useRouter(); 
    const $q = useQuasar(); 

    const { login, navigateToSignUp } = useLogin();

    const handleLogin = () => {
      login(email.value, password.value, router, $q);
    };

    return {
      email,
      password,
      handleLogin,
      navigateToSignUp,
    };
  },
};
</script>

<style scoped>
@import './LoginPage.css'
</style>
