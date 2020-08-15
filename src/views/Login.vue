<template>
  <v-container
    class="mt-10"
  >
    <h1>Login</h1>
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
        Login
      </v-btn>
      <p class="mt-3">
        Didn't have account?
        <v-chip to="/register">register here</v-chip>
      </p>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      this.$router.push({ name: 'Register' });
    },
    login(email, password) {
      if (email && password) {
        this.$store.dispatch('login', { email, password })
          .then(() => {
            console.log(this.email, this.password);
            this.email = '';
            this.password = '';
            if (this.$store.state.access_token) {
              this.$router.push({ name: 'Home' });
            }
          });
      } else {
        console.log('gagal');
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

/* .login {
  margin-top: 50px;
} */
</style>
