import Vue from 'vue'
import Vuex from 'vuex'

import { searchGiphy } from './utils/giphy';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    isSearching: false,
    items: [],
    query: "",
    reachedTheEnd: false,
  },
  mutations: {
    addItems(state, { items }) {
      state.items = [...state.items, ...items];
    },
    setError(state, { error }) {
      state.error = error;
    },
    setIsSearching(state, { isSearching }) {
      state.isSearching = isSearching;
    },
    setItems(state, { items }) {
      state.items = items;
    },
    setQuery(state, { query }) {
      state.query = query;
    },
    setReachedTheEnd(state, { reachedTheEnd }) {
      state.reachedTheEnd = reachedTheEnd;
    },
  },
  actions: {
    search({ commit, state }) {
      if (state.isSearching) return;

      // set store to initial state
      commit('setError', { error: null });
      commit('setItems', { items: [] });
      commit('setReachedTheEnd', { reachedTheEnd: false });

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
        ({ items }) => {
          if (items.length) {
            commit('addItems', { items });
          } else {
            commit('setReachedTheEnd', { reachedTheEnd: true });
          }
        }
      ).catch(
        error => commit('setError', { error })
      ).finally(
        () => commit('setIsSearching', { isSearching: false })
      );
    }
  }
})
