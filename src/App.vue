<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'ThaiSansLite';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
* {
  padding: 0px;
  margin: 0px;
}

@font-face {
  font-family: 'ThaiSansLite';
  src: url('./assets/fonts/ThaiSansLite.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/ThaiSansLite.woff') format('woff'),
    url('./assets/fonts/ThaiSansLite.ttf') format('truetype'),
    url('./assets/fonts/ThaiSansLite.svg#ThaiSansLite') format('svg');
  font-weight: normal;
  font-style: normal;
}
</style>
