import React, {Component} from 'react';
import '../counter/CounterButton.css';

class FooterComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render(){
        return (
            <footer className="footer">
                <span className="text-muted">All right reserved 2020</span>
            </footer>
        )
    }
}

export default FooterComponent;