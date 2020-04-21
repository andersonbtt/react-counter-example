import React, {Component} from 'react';
import '../counter/CounterButton.css';
import {BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js' 

class TodoApp extends Component{

    render(){
        return (
            <div className="todoApp">
                <Router>
                        <>
                            <HeaderComponent/>
                            <Switch>
                                <Route path="/" exact component={LoginComponent} />
                                <Route path="/login" component={LoginComponent} />
                                <Route path="/logout" component={LogoutComponent} />
                                <Route path="/welcome/:name" component={WelcomeComponent} />
                                <Route path="/todos" component={ListTodosComponent} />
                                <Route component={ErrorComponent} />
                            </Switch>
                            <FooterComponent/>
                        </>
                </Router>
            </div>
        )
    }

}

class HeaderComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();


        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="http://www.bittclouds.com" className="navbar-brand">
                            bittclouds
                        </a>
                    </div>
                    <ul className="navbar-nav navbar-collapse">
                        {
                            isUserLoggedIn && (
                                <li>
                                <Link className="nav-link" to="/welcome/anderson">Home</Link>
                                </li>
                            )
                        }
                        {
                            isUserLoggedIn && (
                                <li>
                                    <Link className="nav-link" to="/todos">Todos</Link>
                                </li>
                            )
                        }
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {
                            !isUserLoggedIn && (
                                <li>
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            )
                        }
                        {
                            isUserLoggedIn && (                                
                            <li>
                                <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>
                            </li>
                            )
                        }
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render(){
        return (
            <footer className="footer">
                <span className="text-muted">All right reserved 2020</span>
            </footer>
        )
    }
}

class WelcomeComponent extends Component{
    render(){
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>
            </>
        )
    }
}

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos: [{
                id: 1,
                description: 'Learn React',
                done: false,
                targetDate: new Date()
            },{
                id: 2,
                description: 'Learn Spring',
                done: false,
                targetDate: new Date()
            },{
                id: 3,
                description: 'Learn Linux',
                done: false,
                targetDate: new Date()
            }]
        }
    }
    render(){
    return (
            <div>
                <div className="container">
                    <h1>List Todos</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>{todo.description}</td>
                                            <td>{todo.targetDate.toString()}</td>
                                            <td>{todo.done.toString()}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function ErrorComponent(){
    return <div>An error ocurred</div>
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

export default TodoApp;