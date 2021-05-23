import React, { Component } from 'react';
import "./QuantRespostas.css"

export default class QuantRespostas extends Component {
    constructor(){
        super();
        this.num=""
    }

    _handleNumeroPergutas(evento){
        this.num = evento.target.value
    }
    _pegarNum(){
        this.props.pegarNum(this.num);
    }
    render(){
        return(
            <div className="Container">
                <form onSubmit={this._pegarNum.bind(this)}>
                    <div className="Title">
                        <h1>Digite a quantidade de perguntas que você deseja responder</h1>
                    </div>
                    <div className="in">
                        <input 
                            className="input" 
                            type="text" 
                            placeholder="Quantidade de perguntas"
                            onChange={this._handleNumeroPergutas.bind(this)}
                        />
                        <button className="button">Next</button>
                    </div>
                </form>
            </div>
        );
    }
}