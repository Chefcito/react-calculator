import React, { Component } from 'react';
import './App.css';
import { Display } from './Display';
import { Button } from './Button';

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    current: '',
    chain: [],
    //previous: '',
    //operation: null,
  }

  this.handleButtonClick = this.handleButtonClick.bind(this);

  let test = ['6', '+', '2', '*', '5', '+', '2', '/', '3'];
  console.log(test);
  console.log(this.operateChain(test));
}


handleButtonClick(symbol) {
  console.log("click en:", symbol);
  /* this.setState({
    current: this.state.current + symbol,
  }); */

  switch (symbol) {
    case '+':
    case '-':
      this.setState( ({current, chain}) => {
        if(!current) return;
        chain.push(current);
        chain.push(symbol);
        return {
          //previous: state.current,
          current: '',
          //operation: symbol,
        }
      });
    break;

    case '=':    
      this.setState( ({previous, current, operation}) => {
        if(!previous || !current || !operation) return;
        return {
          previous: '',
          current: this.operate(previous, current, operation),
          operation: null,
        }
      });
    break;

    default: 
      this.setState( (state) => {
        return {
          current: state.current + symbol,
        }
      });
    break;
  }  
}

operateChain(chain) {
  let res = [];

  for(let index = 0; index < chain.length; index++) {
    let elem = chain[index];
    switch(elem) {
      case '*':
      case '/':
        let lastNumber = res[index - 1];
        res[index - 1] = this.operate(lastNumber, chain[index + 1], chain[index]);
        index++;
      break;

      default:
        res.push(elem);
      break;
    }
  }

  let finalRes = res[0];
  for(let index = 0; index < res.length; index++) {
    let elem = res[index];

    if(elem == '+' || elem == '-') {
      finalRes = this.operate(finalRes, res[index+1], elem);
      index++;
    }
  }

  return finalRes;

  /*let op = null;
  let finalRes = res.reduce( (total, elem) => {
    if(elem == '+' || elem == '-') {
      op = elem;
      return total;
    }

    else {
      return this.operate(total, elem, op);
    }
  }, 0);

  return finalRes;*/
}


operate(numA, numB, operation) {
  numA = parseFloat(numA);
  numB = parseFloat(numB);

  switch(operation) {
    case '+':
    return numA + numB;

    case '-':
    return numA - numB;

    case '*':
    return numA * numB;

    case '/':
    return numA / numB;
  }
}

  render() {
    return (
      <article className="App">
        <Display 
        currentInDisplay = {this.state.current}
        chain = {this.state.chain}/>
        

        <Button click={this.handleButtonClick} symbol='6'/>
        <Button click={this.handleButtonClick} symbol='1'/>
        <Button click={this.handleButtonClick} symbol='2'/>
        <Button click={this.handleButtonClick} symbol='+'/>
        <Button click={this.handleButtonClick} symbol='-'/>
        <Button click={this.handleButtonClick} symbol='*'/>
        <Button click={this.handleButtonClick} symbol='/'/>
        <Button click={this.handleButtonClick} symbol='='/>
      </article>
    );
  }
}

export default App;
