import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const Confirma = ({ numero }) =>{

    return(
        <form  className="Container" >
            <div className="Title" >
                    <h1>A quantidades de resposta que você vai responder é {numero}</h1>
            </div>
            <div className="in">
                <Link className="button" to={`/perguntas/${numero}`}>
                    <Button className="button" variant="contained" color="primary" >
                        Start
                    </Button>
                </Link>
                <Link className="button" to={`/`}>
                    <Button variant="contained" color="primary" >
                        Cancel
                    </Button>
                </Link>
                
            </div>
        </form>
    );
}

export default Confirma;