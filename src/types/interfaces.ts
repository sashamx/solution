export interface IGeneralBase {
    baseStore: IGeneralBaseGroup[]
    money: IMoney[]
    isLoding: boolean
    selectedMoney: IMoney
    cart: ICart[]
}

export interface IGeneralBaseGroup {
    id: number
    name: string
    products: IProduct[]
}

export interface IProduct {    
    id: number
    name: string
    price: number
    count: number
}

export interface IMoney {
    name?: string
    value?: number
}

export interface ICart extends IProduct {
    selectedCounts: number;
}