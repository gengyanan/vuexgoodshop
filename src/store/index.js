import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    carPanelDate: [],
    orderData: [],
    count: 0,
    maxOff: false,
    carshow: false,
    cleartimer: null,
    ball: {
      show: true,
      img: '',
      el: null,
    },
    receiveInfo: [{
      "name": "王某某",
      "phone": "13811111111",
      "areaCode": "010",
      "landLine": "64627856",
      "provinceId": 110000,
      "province": "北京市",
      "cityId": 110100,
      "city": "市辖区",
      "countyId": 110106,
      "county": "海淀区",
      "add": "上地十街辉煌国际西6号楼319室",
      "default": true
    }, {
      "name": "李某某",
      "phone": "13811111111",
      "areaCode": "010",
      "landLine": "64627856",
      "provinceId": 110000,
      "province": "北京市",
      "cityId": 110100,
      "city": "市辖区",
      "countyId": 110106,
      "county": "海淀区",
      "add": "上地十街辉煌国际东6号楼350室",
      "default": false
    }],
    todos: [
      {id: 1, text: 'qqq', done: true},
      {id: 2, text: 'wwww', done: false},
      {id: 2, text: 'wwww', done: false},
      {id: 2, text: 'wwww', done: false},
      {id: 2, text: 'wwww', done: false},
      {id: 2, text: 'wwww', done: false},
    ],
    message: 0,
  },
  getters: {
    doneTodos(state) {
      let tods = state.todos.filter(todo => {
        return todo.text == 'wwww'
      })
      return tods
    },
    filterDeDate(state) {
      let data = state.message;
      return data <= 0 ? 0 : data
    },
    totelCount(state) {
      let count = 0;
      state.carPanelDate.forEach(val => {
        count += val.count
      })
      return count
    },
    priceCount(state) {
      let price = 0;
      state.carPanelDate.forEach(val => {
        price += val.price * val.count
      })
      return price
    },
    allChecked(state) {
      let allchecked = true;
      state.carPanelDate.forEach(val => {
        if (!val.checked) {
          allchecked = false
          return;
        }
      })
      return allchecked
    },
    checkedCount(state) {
      let count = 0;
      state.carPanelDate.forEach(val => {
        if (val.checked) {
          count += val.count
        }
      })
      return count
    },
    checkedPrice(state) {
      let price = 0;
      state.carPanelDate.forEach(val => {
        if (val.checked) {
          price += val.count * val.price
        }
      })
      console.log(price);
      return price
    },
    checkedGoods(state) {
      let checkedgoodsArr = [];
      state.carPanelDate.forEach(val => {
        if (val.checked) {
          checkedgoodsArr.push(val)
        }
      })
      return checkedgoodsArr
    }
  },
  mutations: {
    addCalPanelDate(state, data) {
      let bOff = true;
      /**
       * 如果购物车中没有数据的时候
       */

      // let goodsData = data.info
      // Vue.set(goodsData, 'count', data.count)
      // state.carPanelDate.push(goodsData)

      /**
       * 如果购物车中有数据的时候
       */
      // state.carPanelDate.forEach(goods => {
      //   if (goods.sku_id === data.info.sku_id) {
      //     goods.count += data.count;
      //     bOff=false
      //     if(goods.count>goods.limit_num){
      //
      //     }
      //   }
      // })
      state.carPanelDate.forEach(goods => {
        if (goods.sku_id == data.info.sku_id) {
          goods.count += data.count;
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count -= data.count;
            state.maxOff = true
            return
          }
          state.carshow = true
          state.ball.show = true
          state.ball.img = data.info.ali_image
          state.ball.el = event.path[0]
        }
      })
      if (bOff) {
        let goodsData = data.info;
        Vue.set(goodsData, 'count', data.count)
        Vue.set(goodsData, 'checked', true)
        state.carPanelDate.push(goodsData)
        state.carshow = true
        state.ball.show = true
        state.ball.img = data.info.ali_image
        state.ball.el = event.path[0]
      }

    },
    delHandle(state, id) {
      state.carPanelDate.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelDate.splice(index, 1)
          return
        }
      })
    },
    delCheckedGoods(state) {
      let i = state.carPanelDate[i].checked;
      while (i--) {
        if (state.carPanelDate[i].checked) {
          state.carPanelDate.splice(i, 1)
        }
      }
    },
    closePrompt(state) {
      state.maxOff = false
    },
    showHandle(state) {
      clearTimeout(state.cleartimer)
      setTimeout(() => {
        state.carshow = true
      }, 500)

    },
    hideHandle(state) {
      setTimeout(() => {
        state.carshow = false
      }, 500)
    },
    plusCarPaneData(state, id) {
      state.carPanelDate.forEach(val => {
        if (val.sku_id === id) {
          if (val.count >= val.limit_num) return
          val.count++
          return
        }
      })
    },
    subCarPaneData(state, id) {
      state.carPanelDate.forEach(val => {
        if (val.sku_id === id) {
          if (val.count <= 1) {
            return false
          }
          val.count--

        }
      })
    },
    checkGoods(state, id) {
      state.carPanelDate.forEach(val => {
        if (val.sku_id === id) {
          val.checked = !val.checked
          return
        }
      })
    },
    allCheckGoods(state, allChecked) {
      state.carPanelDate.forEach(val => {
        val.checked = !allChecked
      })
    },
    submitReceive(state, data) {
      if (data.default) {
        state.receiveInfo.forEach((receive) => {
          receive.default = false
        })
      }
      state.receiveInfo.push(data)
    },
    sumbitOrder(state, data) {
      state.orderData.unshift(data)
      let i = state.carPanelDate.length
      while (i--) {
        if (state.carPanelDate[i].checked) {
          state.carPanelDate.splice(i, 1)
        }
      }
    },
    payNow(state, id) {
      state.orderData.forEach(order => {
        if (order.orderId === id) {
          order.isPay = true
        }
      })
    }
    // addMessage(state, payload) {
    //   state.count += payload.n
    // },
    // deMessage(state, payload) {
    //   state.count -= payload.n
    // },
    // addMes(state, payload) {
    //   state.message += payload.data
    // },
    // deMes(state, payload) {
    //   state.message -= payload.n
    // }
  },
  actions: {
    //commit 利用参数解构
    // addAction({commit}) {
    //   setTimeout(() => {
    //     commit('addMessage', {
    //       n: 5
    //     })
    //   }, 1000)
    // },
    // addActionHandler({commit}) {
    //
    //   let url = 'https://easy-mock.com/mock/593674a291470c0ac104e2d2/example/dataCount'
    //   axios.get(url).then(res => {
    //     let data = res.data
    //     commit('addMes', data)
    //   })
    // }
  }

})
export default store
