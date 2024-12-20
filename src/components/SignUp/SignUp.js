import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'SignUpView',
  data() {
    return {
      name: "",
      number: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      confirmPasswordTouched: false,
      dialogVisible: false,
      dialogTitle: "",
      dialogMessage: "",
    };
  },
  methods: {
    showDialog(title, message) {
      this.dialogTitle = title;
      this.dialogMessage = message;
      this.dialogVisible = true;
    },
    async handleSignUp() {
      if (!this.name || !this.number || !this.address || !this.password || !this.confirmPassword) {
        this.showDialog("Validation Error", "All fields are required.");
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.showDialog("Password Mismatch", "Passwords do not match.");
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/api/contacts/user', {
          name: this.name,
          email: this.email,
          phnumber: this.number,
          address: this.address,
          password: this.password,
        });

        if (response.data.success) {
          this.showDialog("Signed Up!", "Your account has been created successfully.");
          setTimeout(() => this.$router.push('/'), 1500); // Navigate after showing the dialog
        } else {
          this.showDialog("Sign Up Failed", response.data.message || "There was an error creating your account.");
        }
      } catch (error) {
        console.error("Error during sign up:", error);

        let errorMessage = "There was an error creating your account.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }

        this.showDialog("Sign Up Failed", errorMessage);
      }
    },
  },
  mounted() {
    this.$router = useRouter(); 
  },
};