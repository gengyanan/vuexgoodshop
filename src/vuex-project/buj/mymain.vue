<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
    <router-view name="share"></router-view>
  </div>
</template>

<script>
  import NavBar from "./nav-bar";

  export default {
    name: "mymain",
    components: {NavBar}
  }
</script>

<style scoped>

</style>
