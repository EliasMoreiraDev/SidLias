import PageHeader from 'components/PageHeader';
import React, {FormEvent, useState} from 'react';

import { useNavigate} from 'react-router-dom'
import "./styles.css"
import Input from 'components/Input';
import warningIcon from 'assets/images/icons/warning.svg'
import api from 'services/api';

function TeacherForm(){

    const navigate = useNavigate()

    const [nome, setNome]= useState('')
    const [email, setEmail]= useState('')
    const [senha, setSenha]= useState('')
    const [telefone, setTelefone]= useState('')
    const [link_instagram, setLink_instagram]= useState('')

    const [link_facebook, setLink_facebook]= useState('')
    const [link_linkedin, setLink_linkedin]= useState('')
    const [link_youtube, setLink_youtube]= useState('')

    function handleCreateUser(e: FormEvent){
        e.preventDefault()
        console.log({nome,email,telefone, link_instagram,link_facebook,link_linkedin, link_youtube, senha})

        api.post('/', {
            nome,
            email,
            telefone,
            senha,
            link_instagram,
            link_facebook,
            link_linkedin,
            link_youtube,
            
            
        }).then(()=>{
            alert('Cadastro realizado com sucesso')
            navigate('/')
        }).catch(()=>{alert('Erro no Cadastro')})
    }
    return(
        <div id='page-teacher-form' className='container'>
            <PageHeader description="O primeiro passo é preencher esse formulario de inscrição" title='Cadastro de Usuário'/>

            <main>
                <form onSubmit={handleCreateUser}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name='nome' label='Nome completo' value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
                        <Input name='email' label='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <Input name='senha' label='Senha' value={senha} type='password' onChange={(e)=>{setSenha(e.target.value)}}/>
                        <Input name='telefone' label='telefone' value={telefone} onChange={(e)=>{setTelefone(e.target.value)}}/>
                        <Input name='link_instagram' label='Instagram' value={link_instagram} onChange={(e)=>{setLink_instagram(e.target.value)}}/>
                        <Input name='link_facebook' label='Facebook' value={link_facebook} onChange={(e)=>{setLink_facebook(e.target.value)}}/>
                        <Input name='link_linkedin' label='Linkedin' value={link_linkedin} onChange={(e)=>{setLink_linkedin(e.target.value)}}/>
                        <Input name='link_youtube' label='Youtube' value={link_youtube} onChange={(e)=>{setLink_youtube(e.target.value)}}/>
                    </fieldset>
                    
                    <footer>
                        <p>
                            <img src={warningIcon}  alt="Aviso importante"/>
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
export default TeacherForm