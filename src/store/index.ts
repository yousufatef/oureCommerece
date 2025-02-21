import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import categoriesReducer from './categories/categoriesSlice'
import productsReducer from './products/productsSlice'
import cartReducer from './cart/cartSlice'
import wishlistReducer from './wishlist/wishlistSlice'


const cartRootPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items'],
}
const wishlistRootPersistConfig = {
    key: 'wishlist',
    storage,
    whitelist: ['itemsId'],
}

const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    wishlist: persistReducer(wishlistRootPersistConfig, wishlistReducer),
    cart: persistReducer(cartRootPersistConfig, cartReducer),
},)


const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)
export { store, persistor }