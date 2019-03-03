import Vue from 'vue'
import Vuex from 'vuex'

import { searchGiphy } from './utils/giphy';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSearching: false,
    error: null,
    items: [],
    query: "",
  },
  mutations: {
    setError(state, { error }) {
      state.error = error;
    },
    setIsSearching(state, { isSearching }) {
      state.isSearching = isSearching;
    },
    setQuery(state, { query }) {
      state.query = query;
    },
    setItems(state, { items }) {
      state.items = items;
    },
    addItems(state, { items }) {
      state.items = [...state.items, ...items];
    }
  },
  actions: {
    search({ commit, state }) {
      if (state.isSearching) return;

      commit('setError', { error: null });
      commit('setIsSearching', { isSearching: true });
      commit('setItems', { items: [] });

      searchGiphy({ q: state.query, limit: 5, offset: 0 }).then(
        ({ items }) => commit('setItems', { items })
      ).catch(
        error => commit('setError', { error })
      ).finally(
        () => commit('setIsSearching', { isSearching: false })
      );
    },
    searchMore({ commit, state }) {
      if (state.isSearching) return;

      commit('setError', { error: null });
      commit('setIsSearching', { isSearching: true });

      searchGiphy({ q: state.query, limit: 5, offset: state.items.length }).then(
        ({ items }) => commit('addItems', { items })
      ).catch(
        error => commit('setError', { error })
      ).finally(
        () => commit('setIsSearching', { isSearching: false })
      );
    }
  }
})
