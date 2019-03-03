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

      // set store to initial state
      commit('setError', { error: null });
      commit('setItems', { items: [] });

      // Do search
      commit('setIsSearching', { isSearching: true });
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

      // clear error, if any
      commit('setError', { error: null });

      // Do search for more
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
