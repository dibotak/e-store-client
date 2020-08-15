<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          outlined
          tile
        >
          <v-img
            :src="image_url"
            @error="imageError"
          ></v-img>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          outlined
          tile
        >
          <v-card-title
            class="text-h3 font-weight-bold"
          >{{ name }}</v-card-title>

          <v-card-subtitle
            class="text-h5"
          >
            Rp. {{ price }}
          </v-card-subtitle>

          <v-card-text>Tersedia {{ stock }} barang</v-card-text>

          <v-card-actions>
            <v-btn>Add to cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DetailProduct',
  data() {
    return {
      id: this.$route.params.id,
      image_url: '',
      name: '',
      price: '',
      stock: '',
    };
  },
  methods: {
    imageError() {
      this.image_url = 'https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available.png';
    },
  },
  created() {
    const detail = this.$store.getters.detail(this.id);
    this.image_url = detail.image_url;
    this.name = detail.name;
    this.price = detail.price;
    this.stock = detail.stock;
  },
};
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>
