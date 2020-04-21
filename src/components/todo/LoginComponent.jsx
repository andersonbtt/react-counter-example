import React, {Component} from 'react';
import '../counter/CounterButton.css';
import AuthenticationService from './AuthenticationService.js' 


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
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
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
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>} 
                    {this.state.hasLoginSucceeded && <div>Login Successful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
            
        )
    }
}
export default LoginComponent;