import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartProduct:[]
    },reducers:{
        addCartProducts:(state,action)=>{
            state.cartProduct=action.payload
        },
        delCartProducts:(state,action)=>{
            state.cartProduct=[]
        }
    }
})
export const {addCartProducts,delCartProducts}=cartSlice.actions
export default cartSlice.reducer