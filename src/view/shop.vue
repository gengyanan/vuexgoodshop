<template>
  <div id="main">
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li><a href="javascript:;" class="active">综合排序</a></li>
          <li><a href="javascript:;" class="">销量排序</a></li>
          <li><a href="javascript:;" class="">价格低到高</a></li>
          <li><a href="javascript:;" class="">价格高到低</a></li>
        </ul>
      </div>
      <div class="gray-box">
        <div class="item-box">
          <item-list v-for="(item,index) in  goodsData" :item="item"></item-list>
        </div>
      </div>
    </div>
    <prompt></prompt>
  </div>
</template>

<script>
    import ItemList from "./item-list";
    import goodsData from '@/lib/newGoodsData.js'
    import Prompt from "../components/prompt";
    export default {
      components: {Prompt, ItemList},
      name: "shop",
      data(){
        return {
          goodsData:goodsData,
        }
      },
      created(){
        this.add();
      },
      methods:{
        add(){
          let obj={}
          Object.defineProperty(obj,'newKey',{
            value:'hello'
          })
          console.log(obj.newKey);

        }
      }
    }
</script>

<style scoped>

</style>
