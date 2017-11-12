import React from 'react';
import { render } from 'react-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import base from '../scss/base.scss';

const App = (props) => {
    return [
        <Header key="header"/>,
        <Footer key="footer"/>
    ]
};

render(
    <App/>,
    document.getElementById('app')
  );