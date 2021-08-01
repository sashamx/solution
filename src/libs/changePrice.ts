export const changePrice = (money: number, price: number): number => {
    return Number((price*money).toFixed(2))
}