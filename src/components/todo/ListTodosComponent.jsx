import React, {Component} from 'react';
import TodoDataService from './TodoDataService.js';
import AuthenticationService from './AuthenticationService.js'
import '../counter/CounterButton.css';
import moment from 'moment';

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos: [],
            message: null
        }
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    }

    componentDidMount(){
        this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveAllTodos(username)
        .then( response => this.setState({todos: response.data}))
    }

    addTodoClicked(id){
        let username = AuthenticationService.getLoggedInUser();
        console.log("add: "+id);
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id){
        let username = AuthenticationService.getLoggedInUser();
        console.log(id);
        this.props.history.push(`/todos/${id}`)
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of ${id} was successful.`
                    })
                    this.refreshTodos();
                }
            )
    }

    render(){
        return (
                <div>
                    <div className="container">
                        <h1>List Todos</h1>
                        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Description</th>
                                    <th>Target Date</th>
                                    <th>Is Completed</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map (
                                        todo =>
                                            <tr key={todo.id}>
                                                <td>{todo.id}</td>
                                                <td>{todo.description}</td>
                                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                                <td>{todo.done.toString()}</td>
                                                <td><button className="btn btn-success" 
                                                    onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                                    <td><button className="btn btn-warning" 
                                                        onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="row">
                            <button className="btn btn-success" onClick={this.addTodoClicked}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
        )
    }
}
export default ListTodosComponent;