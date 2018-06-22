<template>
  <div>
    <router-link :to="{name:item.name,query:{orderId:item.id}}" v-for="(item,index) in datapath">{{item.name}}</router-link>
  </div>
</template>

<script>
  export default {
    name: "nav-bar",
    data() {
      return {
        datapath: [
          {
            id: 0,
            name: 'email',
            text: 'email',
          },
          {
            id: 1,
            name: 'prolie',
            text: 'prolie',

          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
