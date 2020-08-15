<template>
  <v-container
    class="mt-10"
  >
    <h1>Register</h1>
    <v-form
      @submit.prevent="login(email, password)"
    >
      <v-text-field
        v-model="email"
        type="email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        required
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        dark
      >
        Register
      </v-btn>
      <p class="mt-3">
        Already have account?
        <v-chip to="/login">login here</v-chip>
      </p>
    </v-form>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$router.push({ name: 'Login' });
    },
    register(email, password) {
      if (email && password) {
        this.$store.dispatch('register', { email, password })
          .then((res) => {
            console.log(res.data);
            console.log(this.email, this.password);
            this.email = '';
            this.password = '';
            Swal.fire(
              'Register Success',
              'Login to continue',
              'success',
            )
              .then(() => {
                this.$router.push({ name: 'Login' });
              });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              'Failed to Register',
              '',
              'error',
            );
          })
          .then(() => {
            console.log('register completed');
          });
      } else {
        console.log('gagal');
        Swal.fire(
          'Failed to Register',
          'something wrong!',
          'error',
        );
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

form {
  width: 400px;
  margin: auto;
}

.register {
  margin-top: 50px;
}
</style>
