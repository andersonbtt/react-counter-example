import React, {Component} from 'react';
import '../counter/CounterButton.css';

class LogoutComponent extends Component {
    render(){
        return (
            <div>
                <h1>You are logged out</h1>
                <div className="container">
                    Thanks for using our application.
                </div>
            </div>
        )
    }
}

export default LogoutComponent;