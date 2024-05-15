import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Input from '../../components/Input';
import '../NewSchedule/newschedule.css'
import Select from '../../components/Select';

export interface AddStatusProps {
  isOpen: boolean;
  onClose: () => void;
  programacao_id: number | null;
  setAddStatusAdded: (value: boolean) => void;
}

function AddStatus({ isOpen, onClose, programacao_id, setAddStatusAdded }: AddStatusProps) {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');

  const [status, setStatus] = useState('');

  const createPost = async (e: FormEvent) => {
    e.preventDefault();

    try {
      
      await api.post('/add-status', {
        programacao_id: programacao_id,
        descricao,
        status
      });
      console.log("valores dos inputs")
      console.log(descricao + status + programacao_id)
      
      onClose();
      setAddStatusAdded(true);
      

    } catch (error) {
      console.error('Erro no Cadastro:', error);
      alert('Erro no Cadastro');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal_overlay'>
      <div className='modal-AddStatus'>
        
      <button onClick={onClose} id='close_button'>
        <span  className="material-symbols-outlined button__icon" id='close_icon' >
          close
        </span>
      </button>

        <h1 className='titulo'>Adicionar Status</h1>

        <form onSubmit={createPost}>
          <Input name='descricao' label='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          <Select label='Status' name='status' value={status} onChange={(e)=>{setStatus(e.target.value)}}
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
          ]}
            
          
          ></Select>
          <button className='confirm_button' type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  );
}

export default AddStatus;
