import React, { useState, useEffect } from 'react';
import ClienteItem from '../../components/ClienteItem';
import EditClientModal from '../../components/EditClientModel'; // Importe o componente EditClientModal
import api from '../../api';
import PageHeader from '../../components/PageHeader';
import './cliente_module.css';
import { Link } from 'react-router-dom';

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
}

function Cliente() {
  const [clientes, setClientes] = useState<Empresa[]>([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Empresa | null>(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/cadastro-cliente');
      setClientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCliente = async (id: number) => {
    try {
      await api.delete(`/cliente/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
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

  return (
    <div>
      <PageHeader title='Lista de clientes' link='/' />
      <Link to={'/cadastro-cliente'}>Adicionar Cliente</Link>
      <div className="lista-clientes">
        {clientes.map((cliente) => (
          <ClienteItem key={cliente.id} empresa={cliente} onDelete={onDeleteCliente} onEdit={() => openModalEdit(cliente)} />
        ))}
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
