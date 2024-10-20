import React from 'react';
import './App.scss';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./Redux/Store";
import ThemeCustomization from './Helpers/Themes';
import { RouterProvider } from 'react-router-dom';
import ScrollTop from './Components/ScrollTop';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppRouter from './AppRoutes';
import 'antd/dist/reset.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeCustomization>
          <ScrollTop>
            <RouterProvider router={AppRouter} />
          </ScrollTop>
        </ThemeCustomization>
      </PersistGate>
    </Provider>
  );
}

export default App;