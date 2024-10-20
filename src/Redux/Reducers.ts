import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

/** @Import_All_reducers */
import AppReducer from "./Reducers/AppReducer";
// import AuthReducer from "./Reducers/Authentication";



// Configuration for redux-persist
const persistConfig = {
    key: process.env.REACT_APP_STORAGE_KEY || 'root', // Root key for persisted state
    storage, // Storage method
    version: 1, // Version number for persisted state
}

// Combine all reducers into a root reducer
const reducerCombinationAsRoot: any = combineReducers({
    // Combine all reducers here like so: AppReducer,
    AppReducer,
    // AuthReducer,
});

// Apply persistReducer to the root reducer
const persistedState = persistReducer(persistConfig, reducerCombinationAsRoot);
export default persistedState;