import React, { useState, useEffect } from 'react';
import './style.css';
import { format } from 'date-fns';
import Confirmation from '../Confirmacao';
import api from '../../api';

interface ScheduleBlockProps {
  id: number;
  descricao: string;
  dataPrevista: Date;
  diasSemana: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void; 
}

interface Status {
  id: number;
  descricao: string;
  status: string;
  data: string;
  programacao_id: number;
  usuario: string
}

const getDayOfWeekInPortuguese = (day: number) => {
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return daysOfWeek[day];
};

const ScheduleItem: React.FC<ScheduleBlockProps> = ({ id, descricao, dataPrevista, diasSemana, onDelete, onEdit }) => {
  const [status, setStatus] = useState<Status | null>(null);
  const formatDateTime = (dateTime: Date) => {
    const formattedDate = format(dateTime, 'dd/MM/yyyy');
    const formattedTime = format(dateTime, 'HH:mm');
    return { formattedDate, formattedTime };
  };

  useEffect(() => {
    fetchStatus();
  }, [id]);

  const fetchStatus = async () => {
    try {
      const response = await api.get(`/status/${id}`);
      const statusData: Status[] = response.data;
      if (statusData.length > 0) {
        setStatus(statusData[0]); 
      } else {
        setStatus(null); 
      }
    } catch (error) {
      console.error('Erro ao buscar o status: ', error);
    }
  };

  const { formattedDate, formattedTime } = formatDateTime(dataPrevista);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
    closeConfirmation();
  };

  const handleEdit = () => { 
    onEdit(id);
  };

  return (
    <div className="schedule-item">
      <div className="info-schedules">
        <h3>{descricao}</h3>
        <p>Data: {formattedDate}</p>
        <p>Hora: {formattedTime}</p>
        <p>Dia da semana: {getDayOfWeekInPortuguese(diasSemana)}</p>
        {status && (<p>Status: {status.status}</p>

        )}
      </div>

      <div className="actions">
        <button className="status-button button" onClick={openConfirmation}>Ver status</button>
        <div className="buttons-editdel">
          <button className="delete-button button" onClick={openConfirmation}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon'>
                delete
              </span>
            </div>
          </button>
          <button className="edit-button button" onClick={handleEdit}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon'>
                edit
              </span>
            </div>
          </button>
        </div>
      </div>

      <Confirmation
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onConfirm={handleDelete}
        text="Tem certeza que deseja excluir este item?"
      />
    </div>
  );
};

export default ScheduleItem;
