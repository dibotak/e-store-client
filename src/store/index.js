import Vue from 'vue';
import Vuex from 'vuex';
import Api from '../../config/ecommerceApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    access_token: localStorage.getItem('access_token'),
    alert: '',
    carts: [],
    subtotal: 0,
  },
  getters: {
    detail(state) {
      return (id) => state.products.filter((el) => el.id === Number(id))[0];
    },
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_TOKEN(state, payload) {
      state.access_token = payload;
    },
    SET_ALERT(state, payload) {
      state.alert = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
    SET_SUBTOTAL(state, payload) {
      state.subtotal = payload;
    },
    REMOVE_TOKEN(state) {
      state.access_token = undefined;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      return Api.get('/products')
        .then((res) => {
          commit('SET_PRODUCTS', res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          console.log('fetch data completed');
        });
    },
    register({ commit }, { email, password }) {
      commit('SET_ALERT', 'register');
      return Api.post('/customer/register', {
        email,
        password,
      });
    },
    login({ commit }, { email, password }) {
      return Api.post('/login', {
        email,
        password,
      })
        .then((res) => {
          commit('SET_TOKEN', res.data.access_token);
          localStorage.setItem('access_token', res.data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchCart({ commit, state }) {
      return Api.get('/cart', {
        headers: {
          access_token: state.access_token,
        },
      })
        .then((res) => {
          commit('SET_CARTS', res.data);
          let total = 0;
          for (let i = 0; i < state.carts.length; i += 1) {
            total += (state.carts[i].price * state.carts[i].Cart.amount);
          }
          commit('SET_SUBTOTAL', total);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          console.log('fetch cart completed');
        });
    },
    addCart({ state }, { id, amount }) {
      return Api.post('/cart', {
        ProductId: id,
        amount,
      }, {
        headers: {
          access_token: state.access_token,
        },
      });
    },
    deleteCart({ state }, id) {
      return Api.delete('/cart', {
        data: {
          id,
        },
        headers: {
          access_token: state.access_token,
        },
      });
    },
  },
  modules: {
  },
});
