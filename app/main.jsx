import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

//we send the data to our App through our source props
ReactDOM.render(<App source="../data/data.json" />, document.querySelector('.container'))
