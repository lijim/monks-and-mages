import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './components/App';
import { WebSocketProvider } from './components/WebSockets';
import { store } from './redux/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <WebSocketProvider>
                <App />
            </WebSocketProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
