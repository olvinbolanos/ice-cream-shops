import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import Firebase, { FirebaseContext } from './component/Firebase'
import App from './component/App';
import * as serviceWorker from './serviceWorker';
import './index.css';


ReactDOM.render(
<FirebaseContext.Provider value={new Firebase()} >
    <Router>
        <App />
    </Router>
</FirebaseContext.Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();