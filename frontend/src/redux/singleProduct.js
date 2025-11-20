import { createSlice } from "@reduxjs/toolkit";

const singleProduct=createSlice({
    name:'myProduct',
    initialState:{
        cartProduct:null
    },
    reducers:{
        addProduct:(state,action)=>{
            state.cartProduct=action.payload
        },
        delProduct:(state,action)=>{
            state.cartProduct=null
        }
    }
})

export const {addProduct,delProduct}=singleProduct.actions;
export default singleProduct.reducer;