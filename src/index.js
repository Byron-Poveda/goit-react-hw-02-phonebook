import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react"; 

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById("root")
  );