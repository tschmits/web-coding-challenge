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
  body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  #app {
    color: #42b983;
    font-size: 20px;
    text-align: center;

    * {
      box-sizing: border-box;
    }
  }
</style>
