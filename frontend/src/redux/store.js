import { configureStore,combineReducers } from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer,persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "./authSlice.js";
import productsSlice from "./productSlice.js";
import cartSlice from './cartSlice.js'
import productSlice from './singleProduct.js'
//persist config
const persistConfig=({
    key:'root',
    storage,
    version:1
})

//root reducer to combine slices
const rootReducer=combineReducers({
    auth:authSlice,
    products:productsSlice,
    cart:cartSlice,
    product:productSlice
    // other:otherSlice
})

//persisted reducer
const persistedReducer=persistReducer(persistConfig,rootReducer);

//stoer configuration..
export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        // ignoredActions:["persist/PERSIST","persist/REHYDRATE","persist/PAUSE","persist/FLUSH","persist/PURGE","persist/REGISTER"],
       serializableCheck:{
        ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths:['auth.user.token']
       }
    })
});

export const persistor = persistStore(store);
