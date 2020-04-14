import React, {Component} from 'react';

class CounterDisplay extends Component{

    render(){
        return(
            <span className="count">{this.props.counter}</span>
        )
    }
}
export default CounterDisplay;