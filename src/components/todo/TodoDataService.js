import axios from 'axios';
import {API_URL} from '../../Constants.js';

class TodoDataService {
    
    retrieveAllTodos(username){
        return axios.get(`${API_URL}/users/jpa/${username}/todos`)
    }
    
    retrieveTodo(username, id){
        return axios.get(`${API_URL}/users/jpa/${username}/todos/${id}`)
    }
    
    createTodo(username, todo){
        return axios.post(`${API_URL}/users/jpa/${username}/todos`, todo)
    }
    
    updateTodo(username, id, todo){
        return axios.put(`${API_URL}/users/jpa/${username}/todos/${id}`, todo)
    }
    
    deleteTodo(username, id){
        return axios.delete(`${API_URL}/users/jpa/${username}/todos/${id}`)
    }

}
export default new TodoDataService();