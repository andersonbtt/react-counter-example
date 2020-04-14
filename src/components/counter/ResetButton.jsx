import React, { Component } from 'react';
import './ResetButton.css';


class ResetButton extends Component {

    render(){
        return (
            <div>
                <button className="reset" onClick={() => this.props.reset()}>
                    Reset
                </button>
            </div>
        )
    }

}
export default ResetButton;