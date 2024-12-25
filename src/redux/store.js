import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage
import counterReducer from '../features/counter/counterSlice'
import credReducer from '../features/cred/credFormSlice'

// Configure persistence
const persistConfig = {
    key: 'root', // Key for the storage
    storage,     // Type of storage (localStorage)
};

// Persist the counter slice reducer
const persistedReducerOfCounter = persistReducer(persistConfig, counterReducer);
const persistedReducerOfCRED = persistReducer(persistConfig, credReducer);

// Create store with persisted reducer
const store = configureStore({
    reducer: {
        counter: persistedReducerOfCounter,
        credForm: persistedReducerOfCRED
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore redux-persist actions
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
