import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'muicss/dist/css/mui.css';
import reducer from './store/reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));

ReactDOM.render(<Provider store={store}>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
