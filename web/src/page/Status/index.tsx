import React, { useState, useEffect } from 'react';
import api from '../../api';
import Input from '../../components/Input';
import Select from '../../components/Select';
import '../../components/EditScheduleModel/style.css'

interface Status {
    id: number;
    descricao: string;
    status: string;
    data: string;
    programacao_id: number;
    usuario: string
  }
interface EditStatusProps {
    isOpen: boolean;
    onClose: () => void;
    status: Status | null;
    setStatus: (status: Status | null) => void;
    updateStatus: () => void;
  }

const Status: React.FC<EditStatusProps> = ({ isOpen, onClose, status, setStatus, updateStatus }) => {
  const [newDescricao, setNewDescricao] = useState('');
  const [newStatus, setNewStatus] = useState('');
  

  useEffect(() => {
    if (status) {
      setNewDescricao(status.descricao);
      setNewStatus(status.status)
    }
  }, [status]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/status/${status?.id}`, {
        descricao: newDescricao,
        status: newStatus
      });

      updateStatus();
      setStatus(null);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  if (!isOpen || !status) return null;

  return (
    <div className="modal_overlay">
      <div className="modal-edit-status">
        <button onClick={onClose} className="close_button-edit-status" id='close_button'>
          <span  className="material-symbols-outlined button__icon" id='close_icon' >
            close
          </span>
        </button>
        <h1 className='titulo'>Status</h1>
        <form onSubmit={handleUpdate}>
          <Input name='descricao' label='Descrição' value={newDescricao} onChange={(e) => setNewDescricao(e.target.value)} />
          <Select label='Status' name='status' value={newStatus} onChange={(e)=>{setNewStatus(e.target.value)}}
          options={[
            {
              value:'Pedido',
              label:'Pedido'
            },
            {
              value:'Em Produção',
              label:'Em Produção'
            },
            {
              value:'Finalizado',
              label:'Finalizado'
            },
            {
              value:'Aguardando Aprovação',
              label:'Aguardando Aprovação'
            },
            {
              value:'Aprovado',
              label:'Aprovado'
            },
            {
              value:'Publicado',
              label:'Publicado'
            },
            {
              value:'IMP',
              label:'IMP'
            },
            {
              value:'Relatório',
              label:'Relatório'
            }
          ]}/>

          <button className='confirm_button' type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default Status;
