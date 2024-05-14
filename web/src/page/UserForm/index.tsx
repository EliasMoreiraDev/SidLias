import PageHeader from '../../components/PageHeader';
import React, {FormEvent, useState} from 'react';

import { useNavigate} from 'react-router-dom'
import "./styles.css"
import Input from '../../components/Input';

import api from '../../api';


function UserForm(){

    const navigate = useNavigate()

    const [senha, setSenha]= useState('')
    const [nome, setNome]= useState('')
    const [email, setEmail]= useState('')
    // const [imagem, setImagem]= useState('')


    function handleCreateUser(e: FormEvent){
        e.preventDefault()
        console.log({email, senha, nome})

        api.post('/cadastro-usuario', {
            email,
            senha, 
            nome
        }).then(()=>{
            alert('Cadastro realizado com sucesso')
            navigate('/')
        }).catch(()=>{alert('Erro no Cadastro')})
    }
    return(
        <div id='page-teacher-form' className='container'>
            <PageHeader link='/cliente' title='Cadastro de Usuário'/>

            <main>
                <form onSubmit={handleCreateUser}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name='nome' label='Nome' value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
                        <Input name='email' label='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>  
                        <Input name='senha' label='Senha' value={senha} onChange={(e)=>{setSenha(e.target.value)}}/>
                        
                        {/* <Input name='imagem' label='Imagem' value={imagem} onChange={(e)=>{setImagem(e.target.value)}}/> */}
                    </fieldset>
                    
                    <footer>
                        <p>
                            <span className="material-symbols-outlined">
                                warning
                            </span>
                            Importante<br/>
                            Preencha todos os dados
                        </p>
                        <button type='submit'>Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>

    )
}
export default UserForm