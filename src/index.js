import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';

const TimerSelects = props => (
  // Onclick set the timer
  <React.Fragment>
    <button
      className='select-pomo'
      onClick={() => props.onSelectorClick({ type: 'POMO' })}
    >
      Pomo
    </button>
    <button
      className='select-break'
      onClick={() => props.onSelectorClick({ type: 'BREAK' })}
    >
      Break
    </button>
    <button
      className='select-largeBreak'
      onClick={() => props.onSelectorClick({ type: 'LARGE_BREAK' })}
    >
      Large break
    </button>
  </React.Fragment>
);

const Timer = props => (
  <h1 className='Timer'>
    {props.min < 10 ? '0' + props.min : props.min}:
    {props.sec < 10 ? '0' + props.sec : props.sec}
  </h1>
);

const TimeControls = props => (
  <React.Fragment>
    <button
      className='start'
      onClick={() => props.onControlerClick({ type: 'START' })}
    >
      Start
    </button>
    <button
      className='stop'
      onClick={() => props.onControlerClick({ type: 'STOP' })}
    >
      Stop
    </button>
    <button
      className='reset'
      onClick={() => props.onControlerClick({ type: 'RESET' })}
    >
      Reset
    </button>
  </React.Fragment>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: '0',
      sec: '0',
    };
  }

  timeControl = action => {
    let tick;

    const startTimer = () => {
      tick = setInterval(
        x => {
          console.log('state: ', x.state);
          let time = parseInt(x.state.min) * 60 + parseInt(x.state.sec);
          console.log(time);

          time--;
          // conversión:
          const min = Math.floor(time / 60);
          const sec = time % 60;
          this.setState({ min: min, sec: sec });
        },
        1000,
        this
      );
    };

    if (action === 'START') {
      console.log('partir');
      startTimer();
    } else if (action === 'STOP') {
      console.log('detener', tick); // tick está undefined
      clearInterval(tick);
    }
  };

  handleSelect = select => {
    switch (select.type) {
      case 'POMO':
        this.setState({ min: 25, sec: 0 });
        break;
      case 'BREAK':
        this.setState({ min: 5, sec: 0 });
        break;
      case 'LARGE_BREAK':
        this.setState({ min: 10, sec: 0 });
        break;
      default:
        break;
    }
  };

  handleControler = handler => {
    switch (handler.type) {
      case 'START':
        console.log(handler);
        this.timeControl('START');
        break;
      case 'STOP':
        console.log(handler);
        this.timeControl('STOP');
        break;
      case 'RESET':
        console.log(handler);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <React.Fragment>
        <TimerSelects onSelectorClick={this.handleSelect} />
        <Timer min={this.state.min} sec={this.state.sec} />
        <TimeControls onControlerClick={this.handleControler} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
