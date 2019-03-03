<template>
  <div id="results">
    <div v-for="item in items">
      <img :src="item['images']['original']['url']">
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Results',
    computed: mapState(['items'])
  }
</script>

<style scoped lang="scss">
  img {
    margin: 20px;
  }
</style>
