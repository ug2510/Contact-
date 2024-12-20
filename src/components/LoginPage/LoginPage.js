import axios from 'axios';

export default function useLogin() {
  const login = async (email, password, router, $q) => {
    try {
      const response = await axios.post('http://localhost:8080/api/contacts/login/', {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.token) {
        const { token, username, address, phone_number } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
        localStorage.setItem('address', address);
        localStorage.setItem('phnumber', phone_number);

        console.log('Logged in as:', username);

        router.push('/HomeView');
      } else {
        $q.notify({
          type: 'negative',
          message: 'Invalid credentials',
          position: 'top',
        });
      }
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'An error occurred. Please try again later.',
        position: 'top',
      });
      console.error('Login error:', error);
    }
  };

  const navigateToSignUp = (router) => {
    router.push('/SignUp');
  };

  return {
    login,
    navigateToSignUp,
  };
}
