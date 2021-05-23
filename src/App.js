import React, { Component } from 'react';
import QuantRespostas from './components/QuantRespostas/QuantRespostas';

class App extends Component() {

  constructor(){
    super();
    this.state = {};
  }

  pegarNum(num) {
    const num = {num};
    this.setState({
      num:this.num
    })
  }
  render(){
    return (
      <div className="container">
        <QuantRespostas pegarNum={this.pegarNum.bind(this)}/>
      </div>
    );
  }
}

export default App;
