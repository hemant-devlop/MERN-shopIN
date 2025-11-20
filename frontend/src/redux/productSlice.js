import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload
        },
        removeProducts: (state, action) => {
            state.products = []
        }
    }

})

export const { addProducts, removeProducts } = productsSlice.actions
export default productsSlice.reducer