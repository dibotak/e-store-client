<template>
  <v-app-bar
    color="primary"
    dark
    app
  >
    <v-spacer>
      <v-toolbar-title>WarungS</v-toolbar-title>
    </v-spacer>

    <v-tabs
      class="ml-10"
    >
      <v-tab
        to="/"
        exact
      >
        Home
      </v-tab>
      <v-tab
        to="/login"
        v-if="!$store.state.access_token"
      >
        Login
      </v-tab>
      <v-tab
        to="/register"
        v-if="!$store.state.access_token"
      >
        Register
      </v-tab>
      <v-tab
        to="/cart"
        v-if="$store.state.access_token"
      >
        Cart
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-btn
      v-if="$store.state.access_token"
      @click="logout"
      color="#F44336"
    >
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      this.$store.commit('REMOVE_TOKEN');
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>

</style>
