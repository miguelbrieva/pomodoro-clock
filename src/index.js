import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Conceptually, components are like JavaScript functions.
 * They accept arbitrary inputs (called "props") and re-
 * turn React elements describing what should appear on
 * the screen.
 */

// Function component
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// ES6 class
// class Welcome extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }
// const element = <Welcome name='Sara' />;
// ReactDOM.render(element, document.getElementById('root'));

function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img className='Avatar' src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className='UserInfo'>
      <Avatar user={props.user} />
      <div className='UserInfo-name'>{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className='Comment'>
      <UserInfo user={props.author} />
      <div className='Comment-text'>{props.text}</div>
      <div className='Comment-date'>{formatDate(props.date)}</div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope learn React!',
  author: {
    name: 'Edgar Ganta',
    avatarUrl: 'https://api.adorable.io/avatars/60/abott@adorable.png',
  },
};

ReactDOM.render(
  <Comment date={comment.date} text={comment.text} author={comment.author} />,
  document.getElementById('root')
);

// Todos los componentes de React deben tratarse como funciones puras con respecto a sus props.