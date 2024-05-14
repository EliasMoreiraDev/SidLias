import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Input from '../../components/Input';
import '../NewSchedule/newschedule.css'
import Select from '../../components/Select';

interface AddStatusProps {
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
              value:'0',
              label:'Pedido'
            },
            {
              value:'1',
              label:'Em Produção'
            },
            {
              value:'2',
              label:'Finalizado'
            },
            {
              value:'3',
              label:'Aguardando Aprovação'
            },
            {
              value:'4',
              label:'Aprovado'
            },
            {
              value:'5',
              label:'Publicado'
            },
            {
              value:'6',
              label:'IMP'
            },
            {
              value:'7',
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
