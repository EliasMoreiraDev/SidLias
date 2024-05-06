import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Input from '../../components/Input';
import Select from '../../components/Select';
import './style.css';

interface NewScheduleProps {
  isOpen: boolean;
  onClose: () => void;
  cliente_id: string | undefined;
  setNewScheduleAdded: (value: boolean) => void; // Adiciona uma função para modificar a variável newScheduleAdded em Schedules
}

function NewSchedule({ isOpen, onClose, cliente_id, setNewScheduleAdded }: NewScheduleProps) {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');
  const [diasSemana, setDiasSemana] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  async function createPost(e: FormEvent) {
    e.preventDefault();

    try {
      const dataHoraFormatada = `${data} ${hora}`;
      await api.post('/cadastro-schedules', {
        descricao,
        diasSemana,
        dataPrevista: dataHoraFormatada,
        cliente_id
      });
      onClose();
      setNewScheduleAdded(true); // Define newScheduleAdded como true para recarregar Schedules
      navigate(`/schedule/${cliente_id}`, { replace: true });

    } catch (error) {
      console.error('Erro no Cadastro:', error);
      alert('Erro no Cadastro');
    }
  }

  if (!isOpen) return null;

  return (
    <div className='modal_overlay'>
      <div className='modal'>
        <h1 className='titulo'>Criar Programação</h1>
        <span onClick={onClose} className="material-symbols-outlined" id='close_button'>
          close
        </span>

        <form onSubmit={createPost}>
          <Input name='descricao' label='Descrição' value={descricao} onChange={(e) => { setDescricao(e.target.value) }} />
          <Input name='data' label='Data' type='date' value={data} onChange={(e) => { setData(e.target.value) }} className='input-date'/>
          <Input name='hora' label='Hora' type='time' value={hora} onChange={(e) => { setHora(e.target.value) }} className='input-time'/>

          <Select options={[
            { value: '0', label: 'Domingo' },
            { value: '1', label: 'Segunda-feira' },
            { value: '2', label: 'Terça-feira' },
            { value: '3', label: 'Quarta-feira' },
            { value: '4', label: 'Quinta-feira' },
            { value: '5', label: 'Sexta-feira' },
            { value: '6', label: 'Sábado' },
          ]} name='diasSemana' label='Dia da semana' value={diasSemana} onChange={(e) => { setDiasSemana(e.target.value) }} />
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  );
}

export default NewSchedule;
