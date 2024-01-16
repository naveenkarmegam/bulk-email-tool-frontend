import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../global/userSlice";
import functionalReducer from "../global/FunctionalSlice";
import recipientsReducer from "../global/recipientsSlice";
import mailReducer from "../global/mailSlice";
const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
  functionality: functionalReducer,
  recipients: recipientsReducer,
  mail: mailReducer,
});

export default rootReducer;
