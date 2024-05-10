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
        <h2>{empresa.fantasia}</h2>
        <p>{empresa.razaoSocial}</p>
        <a href={`mailto:${empresa.email}`}>{empresa.email}</a> <br />
        <a href={`tel:+${empresa.celular}`}>+{empresa.celular}</a>
        <p>90% - Save as lead</p>
        <a href={empresa.link_facebook} target="_blank" rel="noopener noreferrer">
          <img src={face} alt="Facebook" />
        </a>
        <a href={empresa.link_instagram} target="_blank" rel="noopener noreferrer">
          <img src={insta} alt="Instagram" />
        </a>
        <a href={empresa.link_linkedin} target="_blank" rel="noopener noreferrer">
          <img src={linke} alt="Linkedin" />
        </a>
        <a href={empresa.link_youtube} target="_blank" rel="noopener noreferrer">
          <img src={youtube} alt="Youtube" />
        </a>
      </div>

      <div className="actions">
        <div className="buttons-editdel">
          <button className="delete-button button" onClick={openConfirmation}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon' >
                delete
              </span>
            </div>
          </button>
          <button className="edit-button button" onClick={handleEdit}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon' >
              edit
              </span>
            </div>
          </button>
        </div>
        <button onClick={()=>verSchedules(empresa.id)} className="status-button button">Ver Programaçoes</button>
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
