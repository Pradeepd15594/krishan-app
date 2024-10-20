import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import Sagas from './Sagas';
import reducerWithPersistedState from './Reducers';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// Create the Redux store using configureStore
export const store = configureStore({
  reducer: reducerWithPersistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(Sagas);

// Persist the store
export const persistor = persistStore(store);