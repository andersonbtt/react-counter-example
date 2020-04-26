
import axios from 'axios';

class AuthenticationService {

    executeBasicAuthenticationService(username, password){
        return axios.get('http://localhost:8080/basicauth', {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }
        })
    }

    createBasicAuthToken(){
        return 'Basic ' + window.btoa(username+':'+password)
    }

    registerSuccessfulLogin(username, password){
        console.log(`${username} successful logged`)
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptor(this.createBasicAuthToken(username, password))
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn(){
        let loggedUser = sessionStorage.getItem('authenticatedUser')
        if(loggedUser===null) return false
        return true
    }

    getLoggedInUser(){
        let loggedUser = sessionStorage.getItem('authenticatedUser')
        if(loggedUser===null) return ''
        return loggedUser
    }

    setupAxiosInterceptor(basicAuthHeader){               
        axios.interceptors.request.use(
            ( config ) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }

}
export default new AuthenticationService()