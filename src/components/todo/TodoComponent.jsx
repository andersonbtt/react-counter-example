import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import TodoDataService from  './TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';

class TodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values){
        let username = AuthenticationService.getLoggedInUser();

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
            username: username
        }

        if ( this.state.id === -1 ) {
            TodoDataService.createTodo(
                username,
                todo
            ).then(
                this.props.history.push('/todos')
            )
        } else {
            TodoDataService.updateTodo(
                username,
                this.state.id,
                todo
            ).then(
                this.props.history.push('/todos')
            )
        }
    }

    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = 'Enter a description';
        } else if (values.description.length < 5) {
            errors.description = 'Description should have at least 5 characters';
        }

        if(!moment(values.targetDate).isValid()){
            errors.description = 'Enter a valid target date';
        }
        return errors
    }

    componentDidMount(){
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveTodo(username, this.state.id)
                .then(
                    response => this.setState({
                        description: response.data.description,
                        targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                    })
            );
    }

    render(){
        let {description, targetDate} = this.state;
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description,
                            targetDate
                        }}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                        >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}
export default TodoComponent;