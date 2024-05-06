import React, { useState } from 'react';
import './style.css';
import { format } from 'date-fns';
import Confirmation from '../Confirmacao'; // Importe o componente de confirmação

interface ScheduleBlockProps {
  id: number; // Adicione o ID como uma propriedade
  descricao: string;
  dataPrevista: Date;
  diasSemana: number;
  onDelete: (id: number) => void; // Função para deletar um item
}

// Função auxiliar para traduzir o número do dia da semana para o nome em português
const getDayOfWeekInPortuguese = (day: number) => {
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return daysOfWeek[day - 1]; // Ajuste de índice
};

const ScheduleItem: React.FC<ScheduleBlockProps> = ({ id, descricao, dataPrevista, diasSemana, onDelete }) => {
  const formatDateTime = (dateTime: Date) => {
    const formattedDate = format(dateTime, 'dd/MM/yyyy');
    const formattedTime = format(dateTime, 'HH:mm');
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateTime(dataPrevista);
  
  // Estado para controlar a exibição do modal de confirmação
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Função para abrir o modal de confirmação
  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  // Função para fechar o modal de confirmação
  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  // Função para lidar com a exclusão do item ao confirmar a exclusão
  const handleDelete = () => {
    onDelete(id);
    closeConfirmation(); // Fecha o modal após a exclusão
  };

  return (
    <div className="schedule-block">
      <h3>{descricao}</h3>
      <p>Data: {formattedDate}</p>
      <p>Hora: {formattedTime}</p>
      {/* Utiliza a função auxiliar para obter o nome do dia da semana em português */}
      <p>Dia da semana: {getDayOfWeekInPortuguese(diasSemana)}</p>

      {/* Adiciona o evento de clique para excluir */}
      <span className="material-symbols-outlined" id='delete_icon' onClick={openConfirmation}>
        delete
      </span>
      <span className="material-symbols-outlined" id='edit_icon'>
        edit
      </span>

      {/* Renderiza o modal de confirmação se isOpen for verdadeiro */}
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
