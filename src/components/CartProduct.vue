<template>
<div class="block">
    <div class="name">{{item.name}}</div>
    <div class="inputBlock">
        <input class="inputCount" v-model="selectedCount" type="number" @input="changeCount"/>
        <div v-if="errorMessage" class="error">Количество ограничено</div>
    </div>
    <div class="priceCart">{{updatePrice(selectedMoney.value, item.price)}} <span>{{selectedMoney.name}}/шт</span></div>
    <div><button @click="deleteProductCart">Удалить</button></div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ICart, IMoney} from '@/types/interfaces'
import {changePrice} from '@/libs/changePrice'

@Component
export default class CartProduct extends Vue { 
    @Prop() private item!: ICart
    errorMessage: boolean = false
    selectedCount: number = 1

    mounted(){
        this.selectedCount = this.item.selectedCounts
    }
  
    get selectedMoney():IMoney{
        return this.$store.getters.selectedMoney
    }

    changeCount(){
        this.errorMessage = false
        if(this.selectedCount > this.item.count) {
            this.errorMessage = true
            return
        } else if(!this.item.selectedCounts || this.selectedCount < 1){
            this.selectedCount = 1
        }
        this.$store.commit('plusSelectedCount', this.item)
    }

    updatePrice(money: number,price: number){      
        return changePrice(money, price)
    }

    deleteProductCart(){
        this.$store.commit('daleteProductCart', this.item.id)
    }
        
}
</script>

<style scoped>
.block {
    display: flex;
    border-bottom: 1px #ddd solid;
}
.block div {
    padding: 10px;
    
}
.name {width: 50%;}
.inputCount, .priceCart { width: 80px;}
.priceCart span {font-size: 11px;}
.block div.error {
    padding: 5px;
    border: 1px red solid;
    color: red;
    font-size: 11px;
    margin: 5px 0 0;
}
</style>
