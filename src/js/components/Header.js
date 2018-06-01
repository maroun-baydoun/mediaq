import '../../scss/header.scss';

import React from 'react';

const Header = (props) => {
    return (
      <header>
        <div className="headings-container">
            <h1>Mediaq</h1>
            <h2>Listen to media queries updates in JavaScript</h2>
        </div>
        <div className="badges-container">
            <div className="npm-badge">
                <a href="https://badge.fury.io/js/mediaq">
                    <img src="https://badge.fury.io/js/mediaq.svg" alt="npm version" height="18"/>
                </a>
            </div>
            <div className="github-badge">
                <a className="github-button" href="https://github.com/maroun-baydoun/mediaq" data-show-count="true" aria-label="Star maroun-baydoun/new-hope on GitHub"></a>
            </div>
        </div>
    </header>
  );
};

export default Header;
