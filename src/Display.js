import React, {Component} from 'react';
import './Display.css';

export class Display extends Component{
    render (){
        return <section className="Display">
            <Previous 
            chain = {this.props.chain} />
            <Current
             current = {this.props.currentInDisplay}/>
        </section>
    }
}

class __Previous extends Component {
    render() {
        return <h3>{this.props.previous} {this.props.operation}</h3>
    }
}

const Previous = function ( {chain} ) {
    return <h3>
        {chain.map((elem, index) => <span key={index}>{elem}</span>)}
    </h3>
}

const Current = function (props) {
    return <h2>{props.current}</h2>
}