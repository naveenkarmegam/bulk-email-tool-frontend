import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import  userReducer from '../global/userSlice';
import  functionalReducer from '../global/functionalSlice';
import recipientsReducer from '../global/recipientsSlice'
const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
  functionality: functionalReducer,
  recipients:recipientsReducer
});

export default rootReducer;
