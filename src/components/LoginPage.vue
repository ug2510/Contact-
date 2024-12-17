<template>
  <div class="login-container">
    <div class="login-image">
      <img src="../assets/phone-book.jpg" alt="Login Image" />
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
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8080/api/contacts/login/', {
          email: this.email,
          password: this.password,
        })
        console.log(response.data)
        if (response.data.token) {
          const { token, username, address, phone_number } = response.data

          localStorage.setItem('authToken', token)
          localStorage.setItem('username', username)
          localStorage.setItem('address', address)
          localStorage.setItem('phnumber', phone_number)

          console.log('Logged in as:', username)

          this.$router.push('/HomeView')
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Invalid credentials',
            position: 'top',
          })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'An error occurred. Please try again later.',
          position: 'top',
        })
        console.error('Login error:', error)
      }
    },
    navigateToSignUp() {
      this.$router.push('/SignUp')
    },
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.login-image {
  flex: 1;
  max-width: 50%;
  height: 100vh;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form-container {
  flex: 1;
  max-width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.full-height {
  height: 100%;
  width: 100%;
}

h3 {
  font-size: 1.5rem;
  color: #333;
}

.signup-option {
  font-size: 0.9rem;
}

.signup-option p {
  margin: 0;
}

.signup-option .q-btn {
  text-decoration: underline;
  font-weight: bold;
}

.form-field {
  width: 75%;
  justify-content: center;
  margin-left: 70px;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-image {
    max-width: 100%;
    height: auto;
  }

  .login-form-container {
    max-width: 100%;
    height: auto;
    padding: 20px;
  }
}
</style>
