import React, {Component} from 'react';
import '../counter/CounterButton.css';
import {BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';

class TodoApp extends Component{

    render(){
        return (
            <div className="todoApp">
                <Router>
                        <>
                            <Switch>
                                <Route path="/" exact component={LoginComponent} />
                                <Route path="/login" component={LoginComponent} />
                                <Route path="/welcome/:name" component={WelcomeComponent} />
                                <Route path="/todos" component={ListTodosComponent} />
                                <Route component={ErrorComponent} />
                            </Switch>
                        </>
                </Router>
            </div>
        )
    }

}

class WelcomeComponent extends Component{
    render(){
    return (
            <div>
                Welcome {this.props.match.params.name}. 
                You can manage your todos <Link to="/todos">here</Link>.
            </div>
        )
    }
}

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos: [{
                id: 1,
                description: 'Learn React'
            },{
                id: 2,
                description: 'Learn Spring'
            },{
                id: 3,
                description: 'Learn Linux'
            }]
        }
    }
    render(){
    return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
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
            console.log('successful')
            this.props.history.push(`/welcome/${this.state.username}`)
/**            this.setState((prevState)=>{
                return {
                    hasLoginFailed: false,
                    hasLoginSucceeded: true
                }
            }) */
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