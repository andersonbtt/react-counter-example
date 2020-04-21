import React, {Component} from 'react';
import '../counter/CounterButton.css';

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
export default ListTodosComponent;