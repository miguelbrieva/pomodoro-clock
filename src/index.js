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

// const TimerControls = props => (
//   <React.Fragment>
//     <button
//       className='start'
//       onClick={() => props.onControlerClick({ type: 'START' })}
//     >
//       Start
//     </button>
//     <button
//       className='pause'
//       onClick={() => props.onControlerClick({ type: 'PAUSE' })}
//     >
//       Pause
//     </button>
//     <button
//       className='reset'
//       onClick={() => props.onControlerClick({ type: 'RESET' })}
//     >
//       Reset
//     </button>
//   </React.Fragment>
// );

const TimerControler = props => {
  const { control, current, children, onControlerClick } = props;

  if (control === current) {
    return <span>{children}</span>;
  } else {
    return (
      // <button onClick={onControlerClick({ type: control })}>{children}</button>
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
    this.state = {
      min: 25,
      sec: 0,
      lastSelector: null,
      currentControler: null,
    };
    this.tick = null;
  }

  timeControl = action => {
    const startTimer = () => {
      this.tick = setInterval(
        x => {
          console.log('state: ', x.state);
          let time = parseInt(x.state.min) * 60 + parseInt(x.state.sec);
          console.log(time);

          if (time <= 1) {
            clearInterval(this.tick);
            document.getElementById('alarm').play();
            this.setState({ currentControler: null });
          }

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

    switch (action) {
      case 'START':
        startTimer();
        this.setState({ currentControler: 'START' });
        break;
      case 'PAUSE':
        clearInterval(this.tick);
        this.setState({ currentControler: 'PAUSE' });
        break;
      case 'RESET':
        clearInterval(this.tick);
        this.setState({
          min: this.state.lastSelector,
          sec: 0,
          currentControler: 'RESET',
        });
        break;
      default:
        break;
    }
  };

  handleSelect = select => {
    switch (select.type) {
      case 'POMO':
        this.setState({
          min: 25,
          sec: 0,
          lastSelector: 25,
          currentControler: null,
        });
        break;
      case 'BREAK':
        this.setState({
          min: 0,
          sec: 5,
          lastSelector: 5,
          currentControler: null,
        });
        break;
      case 'LARGE_BREAK':
        this.setState({
          min: 10,
          sec: 0,
          lastSelector: 10,
          currentControler: null,
        });
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
        this.setState({ currentControler: 'START' });
        break;
      case 'PAUSE':
        console.log(handler);
        this.timeControl('PAUSE');
        this.setState({ currentControler: 'PAUSE' });
        break;
      case 'RESET':
        console.log(handler);
        this.timeControl('RESET');
        this.setState({ currentControler: 'RESET' });
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
        {/* <TimerControls onControlerClick={this.handleControler} /> */}
        <div>
          <TimerControler
            control='START'
            current={this.state.currentControler}
            onControlerClick={this.handleControler}
          >
            Start
          </TimerControler>
          <TimerControler
            control='PAUSE'
            current={this.state.currentControler}
            onControlerClick={this.handleControler}
          >
            Pause
          </TimerControler>
          <TimerControler
            control='RESET'
            current={this.state.currentControler}
            onControlerClick={this.handleControler}
          >
            Reset
          </TimerControler>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
