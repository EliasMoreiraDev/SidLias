import React, { useState } from 'react'; 
import "./styles.css"
import face from '../../assets/images/icons/icons8-facebook.svg'
import insta from "../../assets/images/icons/instagram.svg"
import linke from "../../assets/images/icons/linkedin.svg"
import youtube from "../../assets/images/icons/youtube.svg"
import api from '../../api';
import Confirmation from '../Confirmacao';
import { useNavigate } from 'react-router-dom';

interface Empresa {
  id: number;
  razaoSocial: string;
  fantasia: string;
  email: string;
  celular: string;
  link_instagram?: string;
  link_facebook?: string;
  link_linkedin?: string;
  link_youtube?: string;
  logo?: string
}

interface ClienteItemProps {
  empresa: Empresa;
  onDelete: (id: number) => Promise<void>; 
  onEdit: () => void; 
}

const ClienteItem: React.FC<ClienteItemProps> = ({ empresa, onDelete, onEdit }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleDelete = async () => { // Modificado para ser uma função assíncrona
    await onDelete(empresa.id); // Passa o id do cliente para a função onDelete
    closeConfirmation();
  };

  const handleEdit = () => { 
    onEdit();
  };
  const navigate = useNavigate()
  const verSchedules = (id: any) => {
    navigate(`/schedule/${id}`)
  }

  return (
    <div id="card">
      <div className="info-emp">
        <h2 className='fantasia-emp'>{empresa.fantasia}</h2>
        <p className='razao-emp'>{empresa.razaoSocial}</p>

        
          
          <a href={`mailto:${empresa.email}`} className="mail-container">
            <span className="material-symbols-outlined">
              mail
            </span> 
            <p className="link-contato">{empresa.email}</p>
          </a>
        

        
          
          <a href={`tel:+${empresa.celular}`} className="telefone-container">
            <span  className="material-symbols-outlined">
              call
            </span>
            <p className="link-contato">+{empresa.celular}</p>
          </a>
        
        <button onClick={()=>verSchedules(empresa.id)} className="ver-prog-button button">Ver Programações</button> 
        
        <div className="link-midias">
          <a href={`https://www.facebook.com/${empresa.link_facebook}`} target="_blank" rel="noopener noreferrer">
            <img src={face} alt="Facebook" />
          </a>
          <a href={`https://www.instagram.com/${empresa.link_instagram}`} target="_blank" rel="noopener noreferrer">
            <img src={insta} alt="Instagram" />
          </a>
          <a href={`https://www.linkedin.com/${empresa.link_linkedin}`} target="_blank" rel="noopener noreferrer">
            <img src={linke} alt="Linkedin" />
          </a>
          <a href={`https://www.youtube.com/${empresa.link_youtube}`} target="_blank" rel="noopener noreferrer">
            <img src={youtube} alt="Youtube" />
          </a>
        </div>
      </div>

      <div className="actions">
        <div className="buttons-editdel-cliente">
          <button className="delete-button-cliente button" onClick={openConfirmation}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon' >
                delete
              </span>
            </div>
          </button>
          <button className="button edit-button-cliente" onClick={handleEdit}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon' >
                edit
              </span>
            </div>
          </button>
        </div>
        <img className='logo-emp' src={empresa.logo} alt="" />
      </div>
            

      <Confirmation
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onConfirm={handleDelete}
        text="Tem certeza que deseja excluir este item?"/>
    </div>
  );
}

export default ClienteItem;
