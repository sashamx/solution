import Vue from 'vue';
import Vuex from 'vuex';
import {
  IGeneralBase, 
  IProduct, 
  IGeneralBaseGroup, 
  IMoney,
  ICart
} from '@/types/interfaces'
import api from 'axios'
import names from '@/data/names.json'
import dataBase from '@/data/data.json'

Vue.use(Vuex);

export default new Vuex.Store<IGeneralBase>({
  state: {
    baseStore: [],
    money: [],
    isLoding: true,
    selectedMoney: {
      name: 'USD',
      value: 1
    },
    cart: []
  },
  mutations: {
    updateMoney(state: IGeneralBase, payload: IMoney[]){      
      state.money = payload      
    },
    createStore(state: IGeneralBase, payload: IGeneralBaseGroup[]){  
      state.baseStore = payload
    },
    setLoading(state: IGeneralBase, payload: boolean){
      state.isLoding = payload
    },
    setMoney(state: IGeneralBase, payload: IMoney){
      state.selectedMoney = payload
    },
    addToCartAndDelete(state: IGeneralBase, payload: IProduct){
      const findResult: ICart | undefined = state.cart.find(el => el.id === payload.id)
      if(findResult){
        state.cart = state.cart.filter(el => el.id !== payload.id)
      } else {
        const newProduct: ICart = {
          ...payload,
          selectedCounts: 1
        }
        state.cart.push(newProduct)
      }
    },
    plusSelectedCount(state: IGeneralBase, payload: ICart){
      const product: ICart | undefined = state.cart.find(el => el.id === payload.id)
      if(product) product.selectedCounts = payload.selectedCounts 
    },
    daleteProductCart(state: IGeneralBase, payload: number){
      state.cart = state.cart.filter(el => el.id !== payload)
    },
  },
  actions: {
    createStore({ commit }) {
      const base: IGeneralBaseGroup[] = []
      for(const key in names){
        const group: IGeneralBaseGroup = {
          id: +key,
          name: (names as any)[key].G,
          products: []
        }

        dataBase.Value.Goods.map(el => {
          if(el.G === +key) {
            const product: IProduct = {
              id: el.T,
              name: (names as any)[key].B[el.T].N,
              price: el.C,
              count: el.P
            }
            group.products.push(product)
          }
        })   
        
        base.push(group)
      }
      commit('createStore', base)
    },
    async updateMoney({ commit }) {
      commit('setLoading', true)
      try {
        const response = await api.get('https://api.exchangerate.host/latest?base=USD');
        const moneys: IMoney[] = []
        for(let key in response.data.rates){
          const money: IMoney = {
            name: key,
            value: response.data.rates[key]
          }
          moneys.push(money)
        }        
        commit('updateMoney', moneys)
        commit('setLoading', false)    
      } catch (error) {
        commit('setLoading', false)    
        console.error(error);
      }
    },
  },
  getters: {
    products(state:IGeneralBase):IGeneralBaseGroup[] {
      return state.baseStore
    },
    money(state:IGeneralBase):IMoney[] {
      return state.money
    },
    isLoading(state:IGeneralBase):boolean{
      return state.isLoding
    },
    selectedMoney(state:IGeneralBase):IMoney{
      return state.selectedMoney
    },
    cart(state:IGeneralBase):ICart[]{
      return state.cart
    },
  },
});
