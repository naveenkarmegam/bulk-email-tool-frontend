// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../global/userSlice'
import functionalReducer from '../global/functionalSlice'
import recipientsReducer from '../global/recipientsSlice'
const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    functionality: functionalReducer,
    recipients:recipientsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };


// import { combineReducers } from '@reduxjs/toolkit';

// import userReducer from '../global/userSlice';
// import functionalReducer from '../global/functionalSlice';
// import recipientsReducer from '../global/recipientsSlice'


// const rootReducer = combineReducers({

// });