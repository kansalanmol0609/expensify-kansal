//install -> import -> use
import React from 'react';
import ReactDOM from 'react-dom';
//We now need not to pass store to each and every component
//we will use Provider instead that will make store available to each component
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import { login, logout} from './actions/auth';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    //Only prop we need to pass is store that you want to share with all of the components
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
//We made this function because we don't want components to render twice
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

//To see whether user is authenticated, this function runs every single time auth status changes
firebase.auth().onAuthStateChanged(( user )=> {
    if(user){
        store.dispatch(login(user.uid));
        console.log('uid', user.uid);
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});