'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import InitializeActions from './actions/initializeActions';

InitializeActions.initApp();
ReactDOM.render(<App />, document.getElementById('app'));
