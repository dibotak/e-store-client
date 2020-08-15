<template>
  <v-card
    class="mx-auto"
    max-width="250"
    outlined
  >
    <v-img
      :src="image"
      :alt="`${name} image`"
      @error="imageError"
    ></v-img>
    <v-card-title>{{ name }}</v-card-title>

    <v-card-subtitle>Rp. {{ price }}</v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="#4CAF50"
        outlined
        :to="`/detail/${id}`"
      >Details</v-btn>
      <v-btn
        color="#01579B"
        outlined
      >Add to cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['name', 'price', 'stock', 'image_url', 'id'],
  data() {
    return {
      image: this.image_url,
    };
  },
  methods: {
    imageError() {
      this.image = 'https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available.png';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.image {
  width: 200px;
  margin: auto;
}
</style>
