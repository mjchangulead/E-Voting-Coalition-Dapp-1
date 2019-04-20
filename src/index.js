import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {submitShowIdea } from './reducers';
import 'tachyons';

const store = createStore(submitShowIdea);

ReactDOM.render(
                <Provider store={store}>
                <App />
                </Provider>, document.getElementById('root'));
registerServiceWorker();
