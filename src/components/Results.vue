<template>
  <div id="results">
    <div class="image-container" v-for="item in items" :key="item.id">
      <a :href="item.bitly_url">
        <img :src="item.images.original.url" :alt="item.title">
      </a>
    </div>
    <div class="message" v-if="isSearching">Searching...</div>
    <div class="message" v-if="error">Oops! Something went wrong. Please try again.</div>
    <div class="message" v-if="reachedTheEnd">That's all folks!</div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Results',
    computed: mapState(['error', 'isSearching', 'items', 'reachedTheEnd']),
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
      removeInfiniteScroll () {
        window.onscroll = null;
      }
    },
    watch: {
      reachedTheEnd(reachedTheEnd) {
        if (reachedTheEnd) {
          this.removeInfiniteScroll();
        } else {
          this.addInfiniteScroll();
        }
      }
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
