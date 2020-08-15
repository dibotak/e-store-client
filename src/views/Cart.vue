<template>
  <div class="cart container mt-5">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" colspan="3">Name</th>
          <th scope="col">Amount</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <CartItem
          class="ccc"
          v-for="(item, i) in $store.state.carts"
          :key="i"
          :image_url="item.image_url"
          :name="item.name"
          :price="item.price"
          :amount="item.Cart.amount"
          :priceTotal="item.price * item.Cart.amount"
          :id="item.id"
        />
      </tbody>
      <tfoot>
        <tr v-if="$store.state.carts.length">
          <th scope="row" colspan="4">Subtotal</th>
          <td>Rp. {{ $store.state.subtotal }}</td>
        </tr>
        <tr v-else>
          <td colspan="5">Your cart is empty</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue';

export default {
  name: 'Cart',
  data() {
    return {
    };
  },
  created() {
    this.$store.dispatch('fetchCart');
  },
  components: {
    CartItem,
  },
};
</script>
