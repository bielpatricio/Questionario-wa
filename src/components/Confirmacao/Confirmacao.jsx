import React, { Component } from 'react';

export class Confirma extends Component {

    render(){
        return(
            <div className="Container">
                <form onSubmit={this._pegarNum.bind(this)}>
                    <div className="Title">
                            <h1>A quantidades de resposta que você vai responder é </h1>
                    </div>
                    <div className="in">
                        <button className="button">Start</button>
                        <button className="button">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}