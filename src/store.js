import Vue from 'vue'
import Vuex from 'vuex'

import { searchGiphy } from './utils/giphy';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    query: "",
  },
  mutations: {
    setQuery(state, { query }) {
      state.query = query;
    },
    setItems(state, { items }) {
      state.items = items;
    }
  },
  actions: {
    search({ commit, state }) {
      searchGiphy({ q: state.query, limit: 5, offset: 0 }).then(
        ({ items }) => commit('setItems', { items })
      );
    }
  }
})
