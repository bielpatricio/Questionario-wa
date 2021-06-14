import React, { useState } from 'react';
import QuantRespostas from './components/QuantRespostas/QuantRespostas.jsx';
import Perguntas from './components/Perguntas/Perguntas.jsx';
import Confirmacao from './components/Confirmacao/Confirmacao.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App(){
    const [num, setNum] = useState(0);

    const dados = (dado) => {
      setNum(dado);
    }

    return (
    
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true}>
            <QuantRespostas aoEnviar={dados}/>
          </Route>
          <Route path="/confirmacao" exact={true}>
            <Confirmacao numero={num}/>
          </Route>
          <Route path='/perguntas/:numero' exact={true}>
            <Perguntas />
          </Route>
        </Switch>
      </BrowserRouter>
    );
    
}

export default App;
