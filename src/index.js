import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';

const DurationSelector = props => (
  <React.Fragment>
    <button
      className='select-pomo'
      onClick={() => props.onDurationSelectorClick({ type: 'POMO' })}
    >
      Pomo
    </button>
    <button
      className='select-break'
      onClick={() => props.onDurationSelectorClick({ type: 'BREAK' })}
    >
      Break
    </button>
    <button
      className='select-largeBreak'
      onClick={() => props.onDurationSelectorClick({ type: 'LARGE_BREAK' })}
    >
      Large break
    </button>
  </React.Fragment>
);

const Display = props => (
  <h1 className='Timer'>
    {props.min < 10 ? '0' + props.min : props.min}:
    {props.sec < 10 ? '0' + props.sec : props.sec}
  </h1>
);

const TimeControler = props => {
  const { control, current, children, onControlerClick } = props;

  if (control === current[0] || control === current[1]) {
    return <span className='button-inactive'>{children}</span>;
  } else {
    return (
      <button
        onClick={() => {
          onControlerClick({ type: control });
        }}
      >
        {children}
      </button>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.timers = {
      pomodoro: 1,
      smallBreak: 5,
      largeBreak: 10,
    };

    this.state = {
      min: this.timers.pomodoro,
      sec: 0,
      lastSelector: this.timers.pomodoro,
      offControler: ['PAUSE', 'RESET'],
      isCountingDown: false,
    };

    this.tick = null;
  }

  startTimer = () => {
    this.tick = setInterval(() => {
      let { min, sec } = this.state;
      let time = parseInt(min) * 60 + parseInt(sec);

      if (time <= 1) {
        clearInterval(this.tick);
        const alarm = document.getElementById('alarm');
        alarm.play();
        setTimeout(() => alarm.pause(), 4000);
        this.setState({
          offControler: ['START', 'PAUSE'],
          isCountingDown: false,
        });
      }
      time--;

      // conversión:
      min = Math.floor(time / 60);
      sec = time % 60;
      this.setState({ min: min, sec: sec });
    }, 1000);
  };

  handleDurationSelector = ({ type }) => {
    const { pomodoro, smallBreak, largeBreak } = this.timers;

    let offControler;
    if (this.state.isCountingDown) {
      offControler = ['START'];
    } else {
      offControler = ['PAUSE', 'RESET'];
    }

    switch (type) {
      case 'POMO':
        this.setState({
          min: pomodoro,
          sec: 0,
          lastSelector: pomodoro,
          offControler,
        });
        break;
      case 'BREAK':
        this.setState({
          min: smallBreak,
          sec: 0,
          lastSelector: smallBreak,
          offControler,
        });
        break;
      case 'LARGE_BREAK':
        this.setState({
          min: largeBreak,
          sec: 0,
          lastSelector: largeBreak,
          offControler,
        });
        break;
      default:
        break;
    }
  };

  handleControl = action => {
    switch (action) {
      case 'START':
        this.startTimer();
        this.setState({ offControler: ['START'], isCountingDown: true });
        break;
      case 'PAUSE':
        clearInterval(this.tick);
        this.setState({ offControler: ['PAUSE'], isCountingDown: false });
        break;
      case 'RESET':
        if (this.state.isCountingDown) {
          this.setState({
            min: this.state.lastSelector,
            sec: 0,
            // offControler: ['START'],
          });
        } else {
          // clearInterval(this.tick);
          this.setState({
            min: this.state.lastSelector,
            sec: 0,
            offControler: ['RESET', 'PAUSE'],
          });
        }
        break;
      default:
        break;
    }
  };

  handleCountdownControler = handler => {
    switch (handler.type) {
      case 'START':
        this.handleControl('START');
        break;
      case 'PAUSE':
        this.handleControl('PAUSE');
        break;
      case 'RESET':
        this.handleControl('RESET');
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className='pomodoro-container'>
        <div className='DurationSelector-container'>
          <DurationSelector
            onDurationSelectorClick={this.handleDurationSelector}
          />
        </div>
        <div className='Display-container'>
          <Display min={this.state.min} sec={this.state.sec} />
        </div>
        <div className='TimerControler-container'>
          <TimeControler
            control='START'
            current={this.state.offControler}
            onControlerClick={this.handleCountdownControler}
          >
            Start
          </TimeControler>
          <TimeControler
            control='PAUSE'
            current={this.state.offControler}
            onControlerClick={this.handleCountdownControler}
          >
            Pause
          </TimeControler>
          <TimeControler
            control='RESET'
            current={this.state.offControler}
            onControlerClick={this.handleCountdownControler}
          >
            Reset
          </TimeControler>
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////
ReactDOM.render(<App />, document.getElementById('root'));
////////////////////////////////////////////////////////////////////////////
