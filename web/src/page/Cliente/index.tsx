import React, { useState, useEffect } from 'react';
import ClienteItem from '../../components/ClienteItem';
import EditClientModal from '../../components/EditClientModel'; 
import api from '../../api';
import PageHeader from '../../components/PageHeader';
import './cliente_module.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader  from '../../components/Loader';
import NoItem from '../../components/NoItem';

export interface Empresa {
  id: number;
  razaoSocial: string;
  fantasia: string;
  email: string;
  celular: string;
  link_instagram?: string;
  link_facebook?: string;
  link_linkedin?: string;
  link_youtube?: string;
  logo?: string;
}

function Cliente() {
  const [clientes, setClientes] = useState<Empresa[]>([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    setLoading(true);
      
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      const response = await api.get('/cadastro-cliente');
      setClientes(response.data);
    } catch (error) {
      console.error(error);
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  };
  

  const onDeleteCliente = async (id: number) => {
    try {
      await api.delete(`/cliente/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
      fetchClientes()
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const openModalEdit = (empresa: Empresa) => {
    setEditingClient(empresa);
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };
  const navigate = useNavigate()
  const criarCliente = () => {
    navigate('/cadastro-cliente')
  }
  const criarUser = () => {
    navigate('/cadastro-usuario')
  }

  return (
    <div>
      <PageHeader title='Lista de clientes' link='/' 
      funcionalidade={    
        <button className="signupBtn" onClick={criarUser}>
            Cadastrar Usuário
          <span className="arrow material-symbols-outlined">
            chevron_right
          </span>
        </button> }/>
      
      <button onClick={criarCliente} className="button-addclient" type="button">
        <span className="button__text">Add Cliente</span>
        <span  className="material-symbols-outlined button__icon" id='edit_icon' >
          add
        </span>
      </button>
      <div className="lista-clientes">
        {loading ? (
          <Loader />
        ) : clientes.length === 0 ? (
          <NoItem text="Não há clientes cadastrados..." />
        ) : (
          clientes.map(cliente => (
            <ClienteItem key={cliente.id} empresa={cliente} onDelete={onDeleteCliente} onEdit={() => openModalEdit(cliente)} />
          ))
        )}
      </div>
      {isModalEditOpen && (
        <EditClientModal
          isOpen={isModalEditOpen}
          onClose={closeModalEdit}
          client={editingClient}
          setClient={setEditingClient}
          updateClient={fetchClientes} 
        />
      )}
    </div>
  );
}

export default Cliente;
