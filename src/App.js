import React, {forceUpdate} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Timer from 'react-compound-timer'

class App extends React.Component {
  constructor(props){
    super(props);

    // Declare states
    this.state = {
      sets: 4,
      times: [0],
      counter: 0,
      countdown: 15,
      timerActive: false,
      newTime: 0,
      timerTimes: [5,3,5,3],
      set: 0,
    }

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleAddTime = this.handleAddTime.bind(this);
    // this.loopTimes = this.loopTimes.bind(this);
  }

  // loopTimes(){
  //   console.log('timerTimes ' + this.state.timerTimes[this.state.set])
  //   console.log('hello from loopTimes');
  //   // this.setState({counter: timerTimes[set]});
  //   // test = () => {this.setState({counter: timerTimes[set]})}
  //   // this.setState(()=>({counter: timerTimes[set]}))
  //   this.setState({timerActive: true})
  //   this.setState({set: this.state.set + 1})
  //   setTimeout(function(){
  //     console.log('hello from setTimeout');
  //     this.setState({timerActive: false})
  //     if(this.state.set > 4){
  //       loopTimes();
  //     }
  //   },this.state.counter)
  // }

  // old_handleStartClick(){
  //   const ctimerActive = this.state.timerActive
  //   console.log('starts been clicked yo');
  //   function loopTimes(){
  //     // console.log('timerActive '+ timerActive)
  //     console.log('timerTimes ' + this.state.timerTimes[this.state.set])
  //     console.log('hello from loopTimes');
  //     // this.setState({counter: timerTimes[set]});
  //     // test = () => {this.setState({counter: timerTimes[set]})}
  //     // this.setState(()=>({counter: timerTimes[set]}))
  //     this.setState({timerActive: true})
  //     this.setState({set: this.state.set + 1})
  //     setTimeout(function(){
  //       console.log('hello from setTimeout');
  //       this.setState({timerActive: false})
  //       if(this.state.set > 4){
  //         loopTimes();
  //       }
  //     },this.state.counter)
  //   }
  //   // this.setState({timerActive: true})
  //   // const timerTimes = [5,3,5,3];
  //   // const set = 0;
  //   // function loopTimes(){
  //   //   console.log('timerTimes ' + timerTimes[set])
  //   //   console.log('hello from loopTimes');
  //   //   // this.setState({counter: timerTimes[set]});
  //   //   test = () => {this.setState({counter: timerTimes[set]})}
  //   //   // this.setState(()=>({counter: timerTimes[set]}))
  //   //   this.setState({timerActive: true})
  //   //   set += 1;
  //   //   setTimeout(function(){
  //   //     console.log('hello from setTimeout');
  //   //     this.setState({timerActive: false})
  //   //     if(set > 4){
  //   //       loopTimes();
  //   //     }
  //   //   },this.state.counter)
  //   // }
  //   loopTimes();
  // }
  handleStartClick(){
    console.log('starts been clicked yo');
      console.log('hello from loopTimes');

      this.setState({counter: this.state.timerTimes[this.state.set]});
      this.setState({timerActive: true})
      this.setState({set: this.state.set + 1})
      setTimeout(()=>{
        console.log('hello from setTimeout');
        this.setState({timerActive: false})
        if(this.state.set > 4){
          this.handleStartClick();
        }
      },this.state.counter * 2000
      )


      // setTimeout(function(){
      //   console.log('hello from setTimeout');
      //   this.setState({timerActive: false})
      //   if(this.state.set > 4){
      //     this.handleStartClick();
      //   }
      // },this.state.counter)
    
  }



  handleTimeChange(e){
    // console.log('set is changing')
    // const new_time = e.target.value
    // console.log(e.target.value)
    this.setState({counter: e.target.value})
  }

  handleAddTime(e){
    console.log('handle add time clicked')
    // this.setState({newTime: e.target.value})
    this.setState({times: this.state.times.concat(1)})
    console.log('times ' + this.state.times)
    this.forceUpdate()

    // this isn't going to work because everyime I add a box it adds it to the array. 
    // I need a dictionary in the array? of the order and it's time value. Then the on change changes the value for just that one
  }


  render() {
    const times = this.state.times
    const timesRender = times.map((time) => <Grid item xs={2}>
                                              <SetTime onChange={this.handleTimeChange} />
                                            </Grid>)

    const timerActive = this.state.timerActive
    
    return(
      <div>
        <Grid container>
          <Grid item xs={12}>
            <h1>Let's get FLEXY</h1>
          </Grid>
          <Grid item xs={1}>
            <TimeRepeater/>
          </Grid>
          {timesRender}
          <Grid item xs={1}>
            <AddTime onClick={this.handleAddTime} />
          </Grid>
          <Grid item xs={12}>
            <StartTime click={this.handleStartClick} />
          </Grid>
          <Grid time={15} item xs={12}>
            {/* put some condtionals here for the timer */}
            {/*  if timer on then show*/}
            {timerActive 
              ?<Timer startTime={this.state.counter} timerActive={this.state.timerActive} />
              :
              <div>Countdown 0</div>
            }
          </Grid>
        </Grid> 
      </div>
    )
  }
}

class TimeRepeater extends React.Component{
  render (){
    return(
      <div className='container'>
        <form>
          {/* <input type='text' placeholder='10'/> */}
          <TextField id="outlined-basic" label="Sets" variant="outlined" />
        </form>
      </div>
    )
  }
}

class SetTime extends React.Component {

  render(props) {
    return(
      <div className='container'>
      <form>
        {/* <TextField type='text' placeholder='30'/> */}
        <TextField onChange={this.props.onChange} id="outlined-basic" label="Time" variant="outlined" />
      </form>
    </div>
    )
  }
}

class AddTime extends React.Component {
  render(props) {
    return(
      <div className='container'>
      <Button onClick={this.props.onClick} variant="contained" color="primary">+</Button>
    </div>
    )
  }
}


class StartTime extends React.Component {
  // handleClick(e){
  //   // start the timer with the value from the input
  //   console.log(e)
  //   console.log(this.props)
  // }

  render(props) {
    return(
      <div className='container'>
      <Button onClick={this.props.click} variant="contained" color="primary">Let's Go</Button>
    </div>
    )
  }
}

// class XXX extends React.Component {
//   render() {
//     return(
//       <div className='container'>
//       <form>
//         <input type='text' placeholder='30'/>
//       </form>
//     </div>
//     )
//   }
// }




// function Timer(props) {
//   const [counter, setCounter] = React.useState(props.startTime);
//   console.log('Timer called')
//   // console.log('props.time ' + props.time)
//   // console.log('counter ' + counter )

//   React.useEffect(() => {
//     counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
//   }, [counter]);

//   return (
//     <div className="App">
//       <div>Countdown: {counter}</div>
//     </div>
//   );
// }

<Timer
    initialTime={55000}
>
    {({ start, resume, pause, stop, reset, timerState }) => (
        <React.Fragment>
            <div>
                <Timer.Days /> days
                <Timer.Hours /> hours
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
                <Timer.Milliseconds /> milliseconds
            </div>
            <div>{timerState}</div>
            <br />
            <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={resume}>Resume</button>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button>
            </div>
        </React.Fragment>
    )}
</Timer>

export default App;
