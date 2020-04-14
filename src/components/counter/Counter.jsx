import React, { Component } from 'react';
import CounterButton from './CounterButton';
import ResetButton from './ResetButton';
import CounterDisplay from './CounterDisplay';
import './Counter.css';

class Counter extends Component {
  
  constructor(){
    super();
    this.state = {
      counter : 0
    }
    this.increment = this.increment.bind(this); 
    this.decrement = this.decrement.bind(this); 
    this.reset = this.reset.bind(this); 
  }

  render() {
    return (
      <div className="App">
        <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement}/>
        <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement} by={5}/>
        <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement} by={10}/>
        <CounterDisplay counter={this.state.counter} />
        <ResetButton reset={this.reset}/>
      </div>
    );
  }

  
  increment(by){ 
    this.setState(
      (prevState) => {
      return {counter: prevState.counter+by}
    }); 
  }

  decrement(by){ 
    this.setState(
      (prevState) => {
      return {counter: prevState.counter-by}
    }); 
  }

  reset(){ 
    this.setState(
      () => {
      return {counter: 0}
    }); 
  }

}


export default Counter;