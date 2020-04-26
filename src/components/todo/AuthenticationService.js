

class AuthenticationService {

    registerSuccessfulLogin(username, password){
        console.log(`${username} successful logged`)
        sessionStorage.setItem('authenticatedUser', username)
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

}
export default new AuthenticationService()