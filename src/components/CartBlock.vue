<template>
<div class="wrap">
    <div class="title">Корзина</div>
    <div v-if="!cart.length" class="notCart">Корзина пуста</div>
    <div v-else>
        <div>
            <cart-product v-for="item in cart" :key="item.id" :item="item"></cart-product>
        </div>
        <div class="total" v-if="cart.length">
            <span>Общая стоимость:</span> {{updatePrice(selectedMoney.value, totalSum)}} <span>{{selectedMoney.name}}</span>    
        </div>
    </div>    
</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import CartProduct from './CartProduct.vue'
import {ICart, IMoney} from '@/types/interfaces'
import {changePrice} from '@/libs/changePrice'

@Component({
  components: {
    CartProduct
  },
})
export default class CartBlock extends Vue { 
    get cart():ICart[] {
        return this.$store.getters.cart
    }

    get selectedMoney():IMoney{
        return this.$store.getters.selectedMoney
    }

    get totalSum():number{
        let sum: number = 0
        this.cart.map(el => {
            sum += el.price*el.selectedCounts
        })
        return Number(sum.toFixed(2))
    }

    updatePrice(money: number,price: number){      
        return changePrice(money, price)
    }
}
</script>

<style scoped>
.wrap {
    margin: 20px;
    border: 1px #ddd solid
}
.title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    background: brown;
    color: #fff;
}
.total {
    padding: 10px;
    font-size: 18px;
    text-align: right;
}
.total span {font-size: 11px;}
.notCart {
    padding: 10px;
    text-align: center;
}
</style>
