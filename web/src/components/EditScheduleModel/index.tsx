import React, { useState, useEffect } from 'react';
import api from '../../api';
import Input from '../../components/Input';
import { Schedule } from '../../page/Schedule';
import './style.css'

interface EditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule | null;
  setSchedule: (schedule: Schedule | null) => void;
  updateSchedules: () => void;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({ isOpen, onClose, schedule, setSchedule, updateSchedules }) => {
  const [newDescricao, setNewDescricao] = useState('');
  const [newData, setNewData] = useState('');
  const [newHora, setNewHora] = useState('');

  useEffect(() => {
    if (schedule) {
      setNewDescricao(schedule.descricao);
      const date = new Date(schedule.dataPrevista);
      setNewData(date.toISOString().slice(0, 10));
      setNewHora(date.toISOString().slice(11, 16));
    }
  }, [schedule]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataHoraFormatada = `${newData} ${newHora}`;
      const diasSemana = new Date(dataHoraFormatada).getDay(); // Determina o dia da semana (0 a 6, onde 0 é Domingo)
      
      await api.put(`/schedules/${schedule?.id}`, {
        descricao: newDescricao,
        diasSemana,
        dataPrevista: dataHoraFormatada,
      });

      updateSchedules();
      setSchedule(null);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar o schedule:', error);
    }
  };

  if (!isOpen || !schedule) return null;

  return (
    <div className="modal_overlay">
      <div className="modal">
      <button onClick={onClose} className="close_button" id='close_button'>
        <span  className="material-symbols-outlined button__icon" id='close_icon' >
          close
        </span>
      </button>
        <h2 className='titulo'>Editar Schedule</h2>
        <form onSubmit={handleUpdate}>
          <Input name='descricao' label='Descrição' value={newDescricao} onChange={(e) => setNewDescricao(e.target.value)} />
          <Input name='data' label='Data' type='date' value={newData} onChange={(e) => setNewData(e.target.value)} />
          <Input name='hora' label='Hora' type='time' value={newHora} onChange={(e) => setNewHora(e.target.value)} />
        

          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditScheduleModal;
