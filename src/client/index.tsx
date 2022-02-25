import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { io, Socket } from 'socket.io-client';

import { App } from './components/App';
import { store } from './redux/store';
/*
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.querySelector<HTMLInputElement>('#input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chatMessage', input.value);
        input.value = '';
    }
});

socket.on('chatMessage', (msg: string) => {
    const item = document.createElement('li');
    item.textContent = `${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
*/

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
