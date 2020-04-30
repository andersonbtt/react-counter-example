import axios from 'axios'
import {API_URL} from '../../Constants.js';

class HelloWorldService {
    
    executeHelloWorldService() {
        //console.log('executed service')
        return axios.get(`${API_URL}/hello-world`);        
    }

    executeHelloWorldBeanService() {
        //console.log('executed service')
        return axios.get(`${API_URL}/hello-world-bean`);        
    }

    executeHelloWorldPathVariable(name) {
        //console.log('executed service')
//        let username = 'user';
//        let password = 'password';
//        let basicAuthHeader = 'Basic ' + window.btoa(username+':'+password)
        return axios.get(
            `${API_URL}/hello-world/${name}`
//            ,{
//                headers: {
//                    authorization: basicAuthHeader
//                }
//            }
        );
    }

}

export default new HelloWorldService()