import PageHeader from '../../components/PageHeader';
import React, {FormEvent, useState} from 'react';

import { useNavigate} from 'react-router-dom'
import "./styles.css"
import Input from '../../components/Input';

import api from '../../api';


function ClientForm(){

    const navigate = useNavigate()

    const [razaoSocial, setRazao]= useState('')
    const [fantasia, setFanstasia]= useState('')
    const [email, setEmail]= useState('')
    const [inativo, setInativo]= useState('')
    const [celular, setCelular]= useState('')
    const [link_instagram, setLink_instagram]= useState('')
    const [link_facebook, setLink_facebook]= useState('')
    const [link_linkedin, setLink_linkedin]= useState('')
    const [link_youtube, setLink_youtube]= useState('')

    function handleCreateUser(e: FormEvent){
        e.preventDefault()
        console.log({razaoSocial,fantasia,email,celular, link_instagram,link_facebook,link_linkedin, link_youtube})

        api.post('/cadastro-cliente', {
            razaoSocial,
            fantasia,
            email,
            celular,
            link_instagram,
            link_facebook,
            link_linkedin,
            link_youtube
            
        }).then(()=>{
            alert('Cadastro realizado com sucesso')
            navigate('/cliente')
        }).catch(()=>{alert('Erro no Cadastro')})
    }
    return(
        <div id='page-teacher-form' className='container'>
            <PageHeader link='/cliente' description="O primeiro passo é preencher esse formulario de inscrição" title='Cadastro de Usuário'/>

            <main>
                <form onSubmit={handleCreateUser}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name='razaoSocial' label='Razão Social' value={razaoSocial} onChange={(e)=>{setRazao(e.target.value)}}/>
                        <Input name='fantasia' label='Nome fantasia' value={fantasia} onChange={(e)=>{setFanstasia(e.target.value)}}/>
                        <Input name='email' label='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>  
                        <Input name='celular' label='celular' value={celular} onChange={(e)=>{setCelular(e.target.value)}}/>
                        <Input name='link_instagram' label='Instagram' value={link_instagram} onChange={(e)=>{setLink_instagram(e.target.value)}}/>
                        <Input name='link_facebook' label='Facebook' value={link_facebook} onChange={(e)=>{setLink_facebook(e.target.value)}}/>
                        <Input name='link_linkedin' label='Linkedin' value={link_linkedin} onChange={(e)=>{setLink_linkedin(e.target.value)}}/>
                        <Input name='link_youtube' label='Youtube' value={link_youtube} onChange={(e)=>{setLink_youtube(e.target.value)}}/>
                    </fieldset>
                    
                    <footer>
                        <p>
                      
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
export default ClientForm