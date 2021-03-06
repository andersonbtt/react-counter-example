
import axios from 'axios';
import {API_URL} from '../../Constants.js';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`, {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }
        })
    }

    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username+':'+password)
    }

    createJwtToken(token){
        return 'Bearer ' + token
    }

    registerSuccessfulLogin(username, password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptor(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptor(this.createJwtToken(token))
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn(){
        let loggedUser = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(loggedUser===null) return false
        return true
    }

    getLoggedInUser(){
        let loggedUser = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(loggedUser===null) return ''
        return loggedUser
    }

    setupAxiosInterceptor(token){               
        axios.interceptors.request.use(
            ( config ) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

}
export default new AuthenticationService()