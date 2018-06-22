<template>
  <div id="pop">
    <div class="module-dialog-layer" style="display: block;"></div>
    <div class="module-dialog clear module-dialog-address module-dialog-show">
      <div class="dialog-panel">
        <div class="topbar">
          <div class="dialog-tit clear">
            <h4 class="js-dialog-title">管理收货地址</h4>
          </div>
          <span class="dialog-close" @click="close">x</span>
        </div>
        <div class="dialog-con js-dialog-container">
          <div class="animate-layer">
            <div class="dialog-inner js-address-add">
              <div class="save-address-box">
                <div class="address-form">
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input type="text" class="js-verify" v-model="receive.name" placeholder="姓名">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3" :class="{'form-invalid-item':phoneError}">
                      <input type="text" class="js-verify" v-model="receive.phone" @blur="inspectPhoneHandle"
                             @fous="setPhoneHandle" placeholder="手机号">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 area-code-w fn-left form-valid-item">
                      <input type="text" class="js-verify js-address-area-code" v-model="receive.areaCode" placeholder="区号（可选）">
                      <div class="verify-error"></div>
                    </div>
                    <div class="form-item-v3 telephone-w fn-right form-valid-item">
                      <input type="text" class="js-verify js-address-telephone" v-model="receive.landLine" placeholder="固定电话（可选）">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item province-wrapper">
                      <select name="province_code" class="province select-province js-form-province js-verify"
                              v-model="receive.provinceId">
                        <option value="0">请选择省份</option>
                        <option :value="province.area_id" v-for="(province,index) in addList">{{province.area_name}}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                      <select class="city select-city js-form-city js-verify" v-model="receive.cityId">
                        <option value="0">请选择城市</option>
                        <option :value="city.area_id" v-for="(city,index) in cityList">{{city.area_name}}</option>
                      </select>
                    </div>
                    <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                      <select class="city select-city js-form-city js-verify" v-model="receive.countyId">
                        <option value="0">请选择区县</option>
                        <option :value="county.area_id" v-for="(county,index) in countyList">{{county.area_name}}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input type="text" class="js-verify" v-model="receive.add" placeholder="详细地址，如街道名称，楼层，门牌号码等">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row fn-clear mg-btm-30">
                    <input type="checkbox" class="hide" v-model="receive.default" >
                    <span  class="blue-checkbox" :class="{'blue-checkbox-on':receive.default}" @click="checkDefault">设为默认</span>
                  </div>
                  <div class="dialog-blue-btn big-main-btn js-verify-address" :class="{'disabled-btn':!isRight}" @click="submitReceiveHanlde">
                    <a style="width: 100%">保存</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import addList from '../lib/addList'

  export default {
    name: "address-pop",
    data() {
      return {
        receive:
          {
            "name": "",
            "phone": "",
            "areaCode": "",
            "landLine": "",
            "provinceId": 0,
            "province": "",
            "cityId": 0,
            "city": "",
            "countyId": 0,
            "county": "",
            "add": "",
            "default": false
          },
        phoneError: false,
        addList,
        isRight:false,
      }
    },
    watch: {
      'receive.countyId'() {
        this.countyList.forEach(county => {
          if (county.area_id === this.receive.countyId) {
            this.receive.county = county.area_name
            return
          }
        })
      },
      receive:{
        handler(){
          this.inspectReceive()
        },
        deep:true
      }

    },
    computed: {
      cityList() {
        let citylist = [];
        this.addList.forEach(province => {
          if (province.area_id === this.receive.provinceId) {
            this.receive.province = province.area_name
            citylist = province.city_list
            return
          }
        })
        if (this.receive.provinceId === '0') {
          this.receive.cityId = 0;
          this.receive.countyId = 0
        }
        return citylist
      },
      countyList() {
        let countylist = [];
        this.cityList.forEach(city => {
          if (city.area_id === this.receive.cityId) {
            countylist = city.county_list
            this.receive.city = city.area_name
            return
          }
        })
        if (this.receive.cityId === '0') {
          this.receive.countyId = 0
        }
        return countylist
      }
    },

    methods: {
      close() {
        this.$emit('closePop');
      },
      inspectPhoneHandle() {
        if (this.receive.phone.length != 11) {
          this.phoneError = true
        }
        else {
          this.phoneError = false;
        }
      },
      setPhoneHandle() {
        this.phoneError = false;
      },
      checkDefault(){
        this.receive.default=!this.receive.default
      },
      inspectReceive(){
       if(this.receive.name && this.receive.phone.length===11 && !this.phoneError && this.receive.province && this.receive.city && this.receive.county && this.receive.add){
         this.isRight=true
       }
       else
       {
         this.isRight=false
       }
      },
      submitReceiveHanlde(){
        if(this.isRight){
          this.$store.commit('submitReceive',this.receive)
          this.$emit('closePop')
        }
      }

    }
  }
</script>

<style scoped>

</style>
