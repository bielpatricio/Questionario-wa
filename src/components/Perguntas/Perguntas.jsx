import React, { useState, useEffect} from 'react';
import { busca } from '../../api/api';
import { useParams, useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Container from '@material-ui/core/Container';
import './Perguntas.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import { green, red, yellow } from "@material-ui/core/colors";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    easy: {
        backgroundColor: green[50],
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    medium: {
        backgroundColor: yellow[50],
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    hard: {
        backgroundColor: red[50],
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    right: {
        backgroundColor: green[100],
        margin: `8px auto`,
        padding: theme.spacing(2),
    },
    wrong: {
        backgroundColor: red[100],
        margin: `8px auto`,
        padding: theme.spacing(2),
    },
  }));

const FormularioPerguntas = () => {
    const history = useHistory()
    const {numero} = useParams()
    const [questoes, setQuestoes] = useState([])
    const [resposta, setResposta] = useState([])
    const [acertos, setAcertos] = useState([])
    const [numAcertos, setNumAcertos] = useState(0)
    const [checked, setChecked] = React.useState(false);
    const [indexCont, setIndexCont] = useState(0)
    const [indexCont2, setIndexCont2] = useState([])

    function handleChange(resp, index){

        if(index!==indexCont){
            setAcertos([...acertos, resposta])
        }
        setIndexCont(index);
        setResposta(resp);
    };
    
    const handleChange2 = () => {
        setChecked((prev) => !prev);
        setAcertos([...acertos, resposta])
        
    };
    const fim = () => {
        localStorage.setItem("@wa/QuantResultado", numAcertos);
        localStorage.setItem("@wa/QuantPerguntas", numero);
        history.push(`/`);
    };
    
    useEffect(()=>{
        busca(`api.php?amount=${numero}`, setQuestoes).catch(()=>{
            history.push('/')
          })
    }, [numero])

    
    const classes = useStyles();

    function corPaper(dificuldade){
        if(dificuldade === 'easy'){
            return(classes.easy);
        }
        if(dificuldade === 'medium'){
            return(classes.medium);
        }
        if(dificuldade === 'hard'){
            return(classes.hard);
        }
        return(classes.easy);
    }
    function checarContagem(respostaSelecionado){
        let k = false;
        indexCont2.map((i)=>{
            if(i===respostaSelecionado){
                k = true;
            }
        })
        if(k){
            return true;
        }else{
            return false;
        }
        
    }
    function corResposta(respostaCerta, respostaSelecionado, index){
        if(respostaCerta === respostaSelecionado){
            if(indexCont2.length===0){
                setNumAcertos(numAcertos+1);
                setIndexCont2([...indexCont2, respostaSelecionado])
            }else{
                if(!checarContagem(respostaSelecionado) && numAcertos<numero){
                    setNumAcertos(numAcertos+1);
                    setIndexCont2([...indexCont2, respostaSelecionado])
                }
            }
            return(classes.right);
        }
        else{
            return(classes.wrong);
        }
    }
    console.log(numAcertos, indexCont2);

    return(
        <Container >
            <div 
                hidden={checked}
            >
                
                <h1>Questionario</h1>
                {
                    questoes.map((q, index)=>(
                        <Paper key={index} className={corPaper(q.difficulty)} >
                                <h2 className='Title'>Questão {index+1}</h2>
                                <h4 className='Categoria'>Categoria: {q.question}</h4>
                                <h4 className='Dificuldade'>Dificuldade: {q.difficulty}</h4>
                                <h3 className='Pergunta'>Pergunta: </h3>
                                <h3 className='Pergunta-title'>{q.question}</h3>
                                
                                <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={resposta.value} onChange={
                                                                                                        (event)=>{
                                                                                                            handleChange(event.target.value, index);
                                                                                                        }}>
                                    {q.incorrect_answers.map((op, index_op)=>(
                                        <FormControlLabel value={op} control={<Radio />} label={op} key={index_op}/>
                                    ))}
                                    <FormControlLabel value={q.correct_answer} control={<Radio />} label={q.correct_answer}/>
                                </RadioGroup>
                                </FormControl>
                        </Paper>
                    ))
                }
                <Button variant="contained" color="primary" className='Botton' onClick={handleChange2}>
                    Finalizar
                </Button>
            </div>
            <div 
                hidden={!checked}
            > 
                <h1>Resultado</h1>
                {
                    questoes.map((q, index)=>(
                        <Paper key={index} className={corPaper(q.difficulty)} >
                            <h2 className='Title'>Questão {index+1}</h2>
                            <h3 className='Pergunta'>Pergunta: </h3>
                            <h3 className='Pergunta-title'>{q.question}</h3>
                            <Paper className={classes.right} >
                                <h3 className='Pergunta'>Respota Correta: </h3>
                                <h3 className='Pergunta-title'>{q.correct_answer}</h3>
                            </Paper>
                            <Paper className={corResposta(q.correct_answer, acertos[index], index)}>
                                <h3 className='Pergunta'>Respota selecionada: </h3>
                                <h3 className='Pergunta-title'>{acertos[index]}</h3>
                            </Paper>
                        </Paper>
                    ))
                }
                <h2 className='Title'>Total: {numAcertos}</h2>
                <Button variant="contained" color="primary" className='Botton' onClick={fim}>
                    Voltar ao inicio
                </Button>
            </div>
            
        </Container>

    );
}

export default FormularioPerguntas;
