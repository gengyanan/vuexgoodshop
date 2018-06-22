<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view/>
  </div>
</template>

<script>
import HeaderNav from "./components/header-nav";

export default {
  components: {HeaderNav},
  name: 'App'
}
</script>

<style>

</style>
