import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'muicss/dist/css/mui.css';
import reducer from './store/reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
                  <Provider store={createStore(reducer)}>
                    <App />
                  </Provider>
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
