'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import InitializeActions from './actions/initializeActions';

import baseStyles from './styles/base.scss';
import palette from './styles/palette.scss';

InitializeActions.initApp();
ReactDOM.render(<App />, document.getElementById('app'));
