import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
function gm_authFailure() {
    document.alert('no api');
    console.log('errror')
  
  }
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
