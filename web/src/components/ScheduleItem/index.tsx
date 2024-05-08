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
  onEdit: (id: number) => void; // Adicionado
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

  const handleEdit = () => { // Adicionado
    onEdit(id);
  };

  return (
    <div className="schedule-block">
      <h3>{descricao}</h3>
      <p>Data: {formattedDate}</p>
      <p>Hora: {formattedTime}</p>
      <p>Dia da semana: {getDayOfWeekInPortuguese(diasSemana)}</p>

      <span className="material-symbols-outlined" id='delete_icon' onClick={openConfirmation}>
        delete
      </span>
      <span className="material-symbols-outlined" id='edit_icon' onClick={handleEdit}> {/* Adicionado */}
        edit
      </span>

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
