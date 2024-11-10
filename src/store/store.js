import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import notificationReducer from "./notificationReducer";
import sessionReducer from "./sessionReducer";
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";
import carritoReducer from "./carritoReducer";

const persistConfig = {
    key: 'root',
    // version: 1,
    storage,
    whitelist: ['session']
}

const rootReducer = combineReducers({
    session: sessionReducer,
    notification: notificationReducer,
    carrito: carritoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
    const persistor = persistStore(store)
    return { store, persistor }
}