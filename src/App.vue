<template>
  <div id="app">
    <SearchBar msg="Enter query here"/>
    <Results/>
  </div>
</template>

<script>
import Results from './components/Results.vue'
import SearchBar from './components/SearchBar.vue'

export default {
  name: 'app',
  components: {
    Results,
    SearchBar
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;

  * {
    box-sizing: border-box;
  }
}
</style>
