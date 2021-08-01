<template>
<div>
  <div v-for="item in items" :key="item.id">
      <div class="block" @click="addDeleteProduct(item)" :class="isActive(item) ? 'active': ''">
          <div>{{item.name}} ({{item.count}})</div>
          <div class="price" v-if="selectedMoney">{{updatePrice(selectedMoney.value, item.price)}} <span>{{selectedMoney.name}}</span></div>
      </div>      
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {IProduct, IMoney, ICart} from '@/types/interfaces'
import {changePrice} from '@/libs/changePrice'

@Component
export default class ViewProducts extends Vue {
  @Prop() private items!:IProduct[]
  
  get selectedMoney(): IMoney{
      return this.$store.getters.selectedMoney
  }

  get cart(): ICart[]{
      return this.$store.getters.cart
  }

  isActive(item: IProduct):boolean{
      if(this.cart.find(el => el.id === item.id)){
          return true
      }
      return false
  }

  addDeleteProduct(product: IProduct){
      this.$store.commit('addToCartAndDelete', product)
  }

  updatePrice(money: number,price: number){      
      return changePrice(money, price)
  }
}
</script>

<style scoped>
.block {
    display: flex;
    border-bottom: 1px #ddd solid;            
    justify-content: space-between;
    cursor: pointer;
}
.block div {
    padding: 10px 20px;
}
.block div.price {
    background: #ddd;
    min-width: 150px;
    text-align: center;
    padding: 10px 0;
}
.price span {
    font-size: 11px;
}
.active {background: rgb(230, 194, 38)}
.active div.price {background: rgb(233, 225, 118);}
</style>
