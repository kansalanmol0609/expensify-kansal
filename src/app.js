//install -> import -> use
import React from 'react';
import ReactDOM from 'react-dom';
//We now need not to pass store to each and every component
//we will use Provider instead that will make store available to each component
import { Provider } from 'react-redux';
import { addExpense } from './actions/expenses';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000 }));
store.dispatch(addExpense({ description: 'Water Bill', amount: 1000, createdAt: -2000 }));
store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1000 }));

console.log(store.getState());

const jsx = (
    //Only prop we need to pass is store that you want to share with all of the components
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));