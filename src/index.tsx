import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {store} from './reducers/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from './components/todo_list/Login';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={ <App/>}/>
                <Route path={'/login'} element={ <Login/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
    ,  document.getElementById('root'));

// new comments for push
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
