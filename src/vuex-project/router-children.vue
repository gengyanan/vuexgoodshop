<template>
  <div>
    <ul>
      <router-link class="mt-500" tag="li" v-for="(item,index) in dataList" :to="'/chidren/'+item.id">{{item.txt}}
      </router-link>
    </ul>
    {{params}}
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "router-children",
    data() {
      return {
        dataList: [
          {
            id: 0,
            txt: 'nihao'
          },
          {
            id: 1,
            txt: 'www'
          }
        ]
      }
    },
computed:{
      params(){
        console.log(this.$route);

        return this.$route.params.id
      }
}

  }
</script>

<style scoped>
  .mt-500 {
    margin-top: 50px;
  }
</style>
