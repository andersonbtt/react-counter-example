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
//https://www.airbnb.com.br/rooms/40038346?s=67&unique_share_id=26defbac-c3a0-423e-8536-ee4662fc95f1
//https://www.airbnb.com.br/rooms/38726528?s=67&unique_share_id=d57674d5-60e6-41f8-8180-21d64f7beb79