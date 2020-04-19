import React, {Component} from 'react';
import '../counter/CounterButton.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

class TodoApp extends Component{

    render(){
        return (
            <div className="todoApp">
                <Router>
                        <>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/welcome" component={WelcomeComponent} />
                        </>
                </Router>
            </div>
        )
    }

}

class WelcomeComponent extends Component{
    render(){
        return <div>Welcome</div>
    }
}

class LoginComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            username: 'anderson',
            password: '',
            hasLoginFailed: false,
            hasLoginSucceeded: false
        }
      this.handleChange = this.handleChange.bind(this);
      this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event){
        console.log(event.target.value)
        this.setState({
            [event.target.name]:
            event.target.value
        })
    }

    loginClicked(){

        if(this.state.username==='anderson' && this.state.password==='password'){
            console.log('successful')
            this.setState((prevState)=>{
                return {
                    hasLoginFailed: false,
                    hasLoginSucceeded: true
                }
            })
            this.props.history.push("/welcome")
        } else {
            console.log('failure')
            this.setState((prevState)=>{
                return {
                    hasLoginFailed: true,
                    hasLoginSucceeded: false
                }
            })
            this.props.history.push("/login")
        }
        console.log(this.state)
    }

    render(){
        return (
            <div className="loginComponent">
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>} 
                {this.state.hasLoginSucceeded && <div>Login Successful</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
            
        )
    }
}

export default TodoApp;