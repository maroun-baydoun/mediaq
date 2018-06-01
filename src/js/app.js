import '../scss/base.scss';

import React from 'react';
import {render} from 'react-dom';

import Header from './components/Header';
import Footer from './components/Footer';

const App = (props) => {
    return (
      <React.Fragment>
        <Header/>
        <Footer/>
      </React.Fragment>
    );
};

render(
    <App/>,
    document.getElementById('app')
  );
