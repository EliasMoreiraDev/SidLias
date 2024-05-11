import React, { useState, useEffect } from 'react';
import api from '../../api';
import Input from '../Input';
import { Empresa } from '../../page/Cliente';
import './style.css'

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Empresa | null;
  setClient: (client: Empresa | null) => void;
  updateClient: () => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({ isOpen, onClose, client, setClient, updateClient }) => {
  const [newRazaoSocial, setNewRazaoSocial] = useState('');
  const [newFantasia, setNewFantasia] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCelular, setNewCelular] = useState('');
  const [newLinkInstagram, setNewLinkInstagram] = useState('');
  const [newLinkFacebook, setNewLinkFacebook] = useState('');
  const [newLinkLinkedin, setNewLinkLinkedin] = useState('');
  const [newLinkYoutube, setNewLinkYoutube] = useState('');
  const [newLogo, setNewLogo] = useState('');

  useEffect(() => {
    if (client) {
      setNewRazaoSocial(client.razaoSocial || '');
      setNewFantasia(client.fantasia || '');
      setNewEmail(client.email || '');
      setNewCelular(client.celular || '');
      setNewLinkInstagram(client.link_instagram || '');
      setNewLinkFacebook(client.link_facebook || '');
      setNewLinkLinkedin(client.link_linkedin || '');
      setNewLinkYoutube(client.link_youtube || '');
      setNewLogo(client.logo || '');
    }
  }, [client]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/cliente/${client?.id}`, {
        razaoSocial: newRazaoSocial,
        fantasia: newFantasia,
        email: newEmail,
        celular: newCelular,
        link_instagram: newLinkInstagram,
        link_facebook: newLinkFacebook,
        link_linkedin: newLinkLinkedin,
        link_youtube: newLinkYoutube,
        logo: newLogo
      });

      updateClient();
      setClient(null);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error);
    }
  };

  if (!isOpen || !client) return null;

  return (
    <div className="modal_overlay">
  <div className="modal">
  <button onClick={onClose} className="buttonclose" id='close_button'>
        <span  className="material-symbols-outlined button__icon" id='close_icon' >
          close
        </span>
      </button>
    <h2 className="titulo">Editar Cliente</h2>
    <div className="modal_content">
      <form onSubmit={handleUpdate}>
        <Input name="razaoSocial" label="Razão Social" value={newRazaoSocial} onChange={(e) => setNewRazaoSocial(e.target.value)} />
        <Input name="fantasia" label="Nome Fantasia" value={newFantasia} onChange={(e) => setNewFantasia(e.target.value)} />
        <Input name="email" label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <Input name="celular" label="Celular" value={newCelular} onChange={(e) => setNewCelular(e.target.value)} />
        <Input name="link_instagram" label="Instagram" value={newLinkInstagram} onChange={(e) => setNewLinkInstagram(e.target.value)} />
        <Input name="link_facebook" label="Facebook" value={newLinkFacebook} onChange={(e) => setNewLinkFacebook(e.target.value)} />
        <Input name="link_linkedin" label="Linkedin" value={newLinkLinkedin} onChange={(e) => setNewLinkLinkedin(e.target.value)} />
        <Input name="link_youtube" label="Youtube" value={newLinkYoutube} onChange={(e) => setNewLinkYoutube(e.target.value)} />
        <Input name='logo' label='Logo da Empresa' value={newLogo} onChange={(e)=>{setNewLogo(e.target.value)}}/>
        <button onClick={handleUpdate} className='confirm_button' type="submit">Atualizar</button>
      </form>
    </div>
  </div>
</div>
  );
};

export default EditClientModal;
