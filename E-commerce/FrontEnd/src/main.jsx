import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import {createStore,combineReducers} from 'redux';
import { cartReducer,likeReducer,paymentReducer } from './services/reducers/reducers.jsx';

const store = createStore(combineReducers({
  cart:cartReducer,
  like:likeReducer,
  payment:paymentReducer
}))

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>,
)