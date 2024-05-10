import React, { useState } from 'react';
import './style.css';
import { format } from 'date-fns';
import Confirmation from '../Confirmacao';

interface ScheduleBlockProps {
  id: number;
  descricao: string;
  dataPrevista: Date;
  diasSemana: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void; 
}

const getDayOfWeekInPortuguese = (day: number) => {
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return daysOfWeek[day];
};

const ScheduleItem: React.FC<ScheduleBlockProps> = ({ id, descricao, dataPrevista, diasSemana, onDelete, onEdit }) => {
  const formatDateTime = (dateTime: Date) => {
    const formattedDate = format(dateTime, 'dd/MM/yyyy');
    const formattedTime = format(dateTime, 'HH:mm');
    return { formattedDate, formattedTime };
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
      </div>

      <div className="actions">
        
        <button className="status-button button">Ver Status</button>
        <div className="buttons-editdel">
          <button className="delete-button button" onClick={openConfirmation}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon' >
                delete
              </span>
            </div>
          </button>
          <button className="edit-button button" onClick={handleEdit}>
            <div className="sign">
              <span className="material-symbols-outlined" id='edit_icon' >
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
