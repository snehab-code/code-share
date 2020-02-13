import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import {startCheckUserAuth, logoutUser} from './actions/user'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()


// store.subscribe(() => {
//     console.log(store.getState(), 'store update')
// })

if (localStorage.getItem('token')) {
    store.dispatch(startCheckUserAuth())
} else {
    store.dispatch(logoutUser())
}

const jsx = (
    <Provider store = {store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
