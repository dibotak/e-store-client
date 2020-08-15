<template>
  <tr>
    <td><button class="btn btn-sm btn-danger" @click="remove">Delete</button></td>
    <td><img :src="image" :alt="`${name} image`" @error="imageError"></td>
    <td>
      <p>{{ name }}</p>
      <p>Rp. {{ price }}</p>
    </td>
    <td>{{ amount }}</td>
    <td>Rp. {{ priceTotal }}</td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'CartItem',
  props: ['image_url', 'name', 'amount', 'price', 'priceTotal', 'id'],
  data() {
    return {
      image: this.image_url,
    };
  },
  methods: {
    imageError() {
      this.image = 'https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available.png';
    },
    remove() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteCart', this.id)
            .then((res) => {
              console.log(res.data);
              Swal.fire(
                'Deleted!',
                'Your cart has been deleted.',
                'success',
              );
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
              console.log('delete cart done');
            });
        }
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 150px;
}
</style>
