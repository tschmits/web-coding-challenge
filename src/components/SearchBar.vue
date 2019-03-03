<template>
  <form class="form" action="/" method="GET">
    <input id="query" :placeholder="msg" @submit="submitted" v-model="userInput">
    <button type="submit" @click.prevent="submitted">searchGiphy</button>
  </form>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    name: 'SearchBar',
    props: {
      msg: String
    },
    data() {
      return {
        userInput: ""
      }
    },
    watch: {
      userInput(query) {
        this.setQuery({ query });
      }
    },
    methods: {
      ...mapMutations(['setQuery']),
      ...mapActions(['search']),
      submitted() {
        this.search();
      }
    }
  }
</script>

<style scoped lang="scss">
  button, input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin: 5px;
    font-size: 20px;
  }
</style>
