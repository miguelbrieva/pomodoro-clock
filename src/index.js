import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function tick() {
  const element = (
    <div>
      <h1>Audiomusica</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);

// It calls ReactDOM.render() every second from a setInterval() callback.
// In practice, most REact appd only call ReactDOM.render() once.