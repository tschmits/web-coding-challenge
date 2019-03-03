<template>
  <div id="results">
    <div v-for="item in items">
      <img :src="item['images']['original']['url']">
    </div>
    <div v-if="isSearching">Getting results...</div>
    <div v-if="error">Oops! Something went wrong. Please try again.</div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Results',
    computed: mapState(['error', 'isSearching', 'items']),
    methods: {
      ...mapActions(['searchMore']),
      addInfiniteScroll () {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight;
          if (bottomOfWindow === document.documentElement.offsetHeight) {
            this.searchMore();
          }
        };
      },
    },
    mounted() {
      this.addInfiniteScroll();
    }
  }
</script>

<style scoped lang="scss">
  img {
    margin: 20px;
    max-width: calc(100% - 40px);
  }
</style>
