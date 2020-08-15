<template>
  <div class="container mt-5">
    <div class="row row-cols-1 row-cols-md-4">
      <ProductCard
        v-for="(product, i) in products"
        :key="i"
        :name="product.name"
        :image_url="product.image_url"
        :price="product.price"
        :stock="product.stock"
        :id="product.id"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'Home',
  data() {
    return {
      products: this.$store.state.products,
    };
  },
  created() {
    this.$store.dispatch('fetchProducts')
      .then(() => {
        this.products = this.$store.state.products;
        console.log(this.products);
      });
  },
  components: {
    ProductCard,
  },
};
</script>
