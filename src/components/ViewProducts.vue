<template>
<div>
    <div 
        v-for="group in products" 
        :key="group.id"  
        class="pad"      
    >
        <div v-if="group.products.length">
            <div class="title">{{group.name}}</div>
            <div>
                <products-table :items="group.products"></products-table>
            </div> 
        </div>        
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IGeneralBaseGroup} from '@/types/interfaces'
import ProductsTable from './ProductsTable.vue'

@Component({
  components: {
    ProductsTable,
  },
})
export default class ViewProducts extends Vue {
  
  get products(): IGeneralBaseGroup[]{
      return this.$store.getters.products
  }
}
</script>

<style scoped>
.title {
    background: #000;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    padding: 10px 20px;
}
.pad {
    margin: 20px;
   
}
</style>
