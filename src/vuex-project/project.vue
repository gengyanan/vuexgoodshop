<template>
  <div>
    <button class="button" @click="deHandle">-</button>
    <span>{{num}}</span>
    <button class="button" @click="add">+</button>

    <ul>
      <li v-for="(todo,index) in doneTodosCount">{{todo.text}}</li>
    </ul>

    <button @click="delHandler">-</button>
    <span>{{getNum}}</span>
    <button @click="addHandler">+</button>
  </div>
</template>

<script>
  export default {
    name: "project",
    computed: {
      num() {
        return this.$store.state.count;
      },
      doneTodosCount() {
        let doneTodos = this.$store.getters.doneTodos;
        return doneTodos
      },
      getNum(){
        return this.$store.getters.filterDeDate
      }
    },
    methods: {
      //异步提交
      add() {
        this.$store.dispatch('addAction');
      },
      addHandler(){
        this.$store.dispatch('addActionHandler')
      },
      //同步提交
      deHandle() {
        this.$store.commit('deMessage', {
          n: 5
        });
      },
      delHandler(){
        this.$store.commit('deMes',{
          n:1
        })
      }
    }


  }
</script>

<style scoped>
  .button {
    width: 35px;
    height: 20px;
    background: #e9971d;
    color: #fff;
    line-height: 20px;
  }
</style>
