import { combineReducers, configureStore } from "@reduxjs/toolkit";
import FunctionalReducer from "../global/FunctionalSlice";
import userReducer from "../global/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  funactionality: FunctionalReducer,
});

const prersistConfig = {
    key : 'root',
    version:1,
    storage,
}
const persistedReducer = persistReducer(prersistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

