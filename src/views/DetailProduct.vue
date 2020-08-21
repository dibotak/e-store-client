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

          <v-card-text>Stocks: {{ stock }}</v-card-text>

          <v-card-actions>
            <v-form action="" @submit.prevent="add">
              <v-text-field
                v-model="amount"
                type="number"
                label="Amount"
                :max="stock"
                min="1"
              ></v-text-field>
              <v-btn type="submit">Add to cart</v-btn>
              <v-btn>Buy now</v-btn>
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'DetailProduct',
  data() {
    return {
      id: this.$route.params.id,
      image_url: '',
      name: '',
      price: '',
      stock: '',
      amount: 1,
    };
  },
  methods: {
    imageError() {
      this.image_url = 'https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available.png';
    },
    add() {
      const { id, amount } = this;
      console.log(this.amount);
      if (this.amount > 0) {
        this.$store.dispatch('addCart', {
          id,
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
