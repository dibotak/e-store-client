<template>
  <div>
    <form action="" @submit.prevent="add">
      <label for="amount" class="mr-3">Amount: </label>
      <input type="number" min="0" :max="stock" v-model="amount">
      <button class="btn btn-success ml-3">Add</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'AddToCart',
  data() {
    return {
      ProductId: this.$route.params.id,
      stock: null,
      amount: 1,
    };
  },
  methods: {
    add() {
      const { ProductId, amount } = this;
      console.log(this.amount);
      if (this.amount > 0) {
        this.$store.dispatch('addCart', {
          ProductId,
          amount,
        })
          .then((res) => {
            console.log(res);
            console.log('product added');
            this.$router.push({ name: 'Cart' });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              'Error',
              'Something wrong!',
              'error',
            );
          })
          .then(() => {
            console.log('add cart completed');
          });
      } else {
        console.log('cannot add');
      }
    },
  },
  created() {
    this.stock = this.$store.getters.detail(this.ProductId).stock;
  },
};
</script>
