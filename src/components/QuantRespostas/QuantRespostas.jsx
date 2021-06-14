import React, { useState, useEffect } from 'react';
import "./QuantRespostas.css"
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

function QuantRespostas({aoEnviar}){
    const [num, setNum] = useState(0);
    const history = useHistory();
    const [checked, setChecked] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`handleSubmit`)
        aoEnviar(num);
        history.push(`/confirmacao`);
        // history.goBack();
    };

    const reload = () => {
        localStorage.clear()
        window.location.reload();
    };
    const handleChange = (event) => {
        setNum(
            event.target.value
        );
    };
    const quantResultado = localStorage.getItem('@wa/QuantResultado');
    const quantPerguntas = localStorage.getItem('@wa/QuantPerguntas');

    
    useEffect(()=>{
        if(quantResultado!==null){
            console.log(quantResultado)
            setChecked(true);
        }
    }, [quantResultado])
    return(
        <Container maxWidth="sm">
            <form className="Container" onSubmit={handleSubmit}>
                <h1>Digite a quantidade de perguntas que você deseja responder</h1>
                <TextField
                    id="num"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" >
                    Next
                </Button>
            </form>
            <div 
                hidden={!checked}
            >
                <h1>Temos o resultado de um questionario respondido e ele teve o resultado de {quantResultado} acertos de {quantPerguntas} perguntas</h1>
                <Button onClick={reload} variant="contained" color="primary">
                    Zerar LocalStorage
                </Button>
            </div>
        </Container>
        
    );
    
}

export default QuantRespostas;