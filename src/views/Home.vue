<template>
  <div class="home">
    <div class="catalog">
      <view-products></view-products>
    </div>    
    <div class="right">
      <cart-block></cart-block>
      <money-block></money-block> 
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ViewProducts from '@/components/ViewProducts.vue';
import MoneyBlock from '@/components/MoneyBlock.vue';
import CartBlock from '@/components/CartBlock.vue';

@Component({
  components: {
    ViewProducts,
    MoneyBlock,
    CartBlock,
  },
})
export default class Home extends Vue {
  private mounted() {
    this.$store.dispatch('createStore');
  }
}
</script>

<style scoped>
  .home {
    display: flex;
  }
  .catalog {
    width: 60%;
  }
  .right {
    width: 40%;
  }
</style>