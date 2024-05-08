import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Input from '../../components/Input';
import './style.css';

interface NewScheduleProps {
  isOpen: boolean;
  onClose: () => void;
  cliente_id: string | undefined;
  setNewScheduleAdded: (value: boolean) => void;
}

function NewSchedule({ isOpen, onClose, cliente_id, setNewScheduleAdded }: NewScheduleProps) {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const createPost = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const dataHoraFormatada = `${data} ${hora}`;
      const diasSemana = new Date(dataHoraFormatada).getDay(); // Determina o dia da semana (0 a 6, onde 0 é Domingo)
      
      await api.post('/cadastro-schedules', {
        descricao,
        diasSemana,
        dataPrevista: dataHoraFormatada,
        cliente_id
      });

      onClose();
      setNewScheduleAdded(true);
      navigate(`/schedule/${cliente_id}`, { replace: true });

    } catch (error) {
      console.error('Erro no Cadastro:', error);
      alert('Erro no Cadastro');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal_overlay'>
      <div className='modal'>
        <h1 className='titulo'>Criar Programação</h1>
        <span onClick={onClose} className="material-symbols-outlined" id='close_button'>
          close
        </span>

        <form onSubmit={createPost}>
          <Input name='descricao' label='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          <Input name='data' label='Data' type='date' value={data} onChange={(e) => setData(e.target.value)} className='input-date'/>
          <Input name='hora' label='Hora' type='time' value={hora} onChange={(e) => setHora(e.target.value)} className='input-time'/>

          <button type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  );
}

export default NewSchedule;
