<template>
<div class="wrap">
    <div v-if="isLoading">ЗАГРУЗКА</div>
    <div v-else>
        <div class="title">Курсы валют</div>
        <div class="pad">
            <input 
                v-model="search" 
                placeholder="поиск" 
                class="input"
                @input="searchEvent"
            />
        </div>
        <div 
            v-for="item in result" 
            :key="item.name"  
            class="pad" 
            :class="selected.name === item.name ? 'active' : ''" 
            @click="setMoney(item)"    
        >
            <span>{{item.name}}</span> : {{item.value}}
        </div>
    </div>    
</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import {IMoney} from '@/types/interfaces'

@Component
export default class MoneyBlock extends Vue { 
    search: string = ''
    result: IMoney[] = []

    get isLoading(): boolean{
        return this.$store.getters.isLoading
    }

    get money(): IMoney[]{        
        return this.$store.getters.money
    }

    get selected(): IMoney{
        return this.$store.getters.selectedMoney
    }

    mounted(){
        this.$store.dispatch('updateMoney')
        this.timeReLoader()        
    }

    timeReLoader(){
        setInterval(() => {
            this.$store.dispatch('updateMoney')
        }, 900000)
    }

    @Watch('money')
    changeResult(){
        this.result = this.money
    }
    
    searchEvent(){  
        this.result = []      
        const serach = this.search?.toLowerCase();
        this.money.map((el) => {
            if (el.name?.toLowerCase().indexOf(serach) != -1) {
                this.result.push(el);
            }
        });                
    }

    setMoney(money: IMoney){
        this.$store.commit('setMoney', money)
    }
}
</script>

<style scoped>
.wrap {
    margin: 20px;
    border: 1px #ddd solid;    
}
.pad {
    padding: 10px;
    border-bottom: 1px #ddd solid;
    font-size: 12px;
    cursor: pointer;
}
.pad span {
    font-weight: bold;
    color: dodgerblue;
}
.title {
    background: rgb(96, 3, 99);
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
}
.input {
    width: 220px;
    margin: 0;
    padding: 5px;
    border: 1px #ccc solid
}
.active {background: #ddd;}
</style>
