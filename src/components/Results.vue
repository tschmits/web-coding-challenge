<template>
  <div id="results">
    <div class="image-container" v-for="item in items" :key="item.id">
      <img :src="item['images']['original']['url']" >
    </div>
    <div class="message" v-if="isSearching">Searching...</div>
    <div class="message" v-if="error">Oops! Something went wrong. Please try again.</div>
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
  .image-container {
    img {
      width: 480px;
      margin: 20px;
      max-width: calc(100% - 40px);
    }
  }

  .message {
    font-size: 30px;
  }
</style>
