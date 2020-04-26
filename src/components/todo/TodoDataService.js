import axios from 'axios';
class TodoDataService {
    
    retrieveAllTodos(username){
        return axios.get(`http://localhost:8080/users/${username}/todos`)
    }
    
    retrieveTodo(username, id){
        return axios.get(`http://localhost:8080/users/${username}/todos/${id}`)
    }
    
    createTodo(username, todo){
        return axios.post(`http://localhost:8080/users/${username}/todos`, todo)
    }
    
    updateTodo(username, id, todo){
        return axios.put(`http://localhost:8080/users/${username}/todos/${id}`, todo)
    }
    
    deleteTodo(username, id){
        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`)
    }

}
export default new TodoDataService();