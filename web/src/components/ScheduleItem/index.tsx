import React from 'react';
import './style.css'


interface ScheduleBlockProps {
  descricao: string;
  dataPrevista: string;
  diasSemana: number;
}

const ScheduleItem: React.FC<ScheduleBlockProps> = ({ descricao, dataPrevista, diasSemana }) => {
  // Função para formatar a data e hora de forma bonita
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const formattedTime = date.toLocaleTimeString('pt-BR', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} - ${formattedTime}`;
};

  // Função para obter o nome do dia da semana a partir do número
  const getDayOfWeek = (day: number) => {
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return daysOfWeek[day - 1]; // Ajustando o índice para começar de 0
  };
  
    return (
      <div className="schedule-block">
        <h3>{descricao}</h3>
        <p>Data: {formatDateTime(dataPrevista)}</p>
        <p>Dia da semana: {getDayOfWeek(diasSemana)}</p>
      </div>
    );
  };

export default ScheduleItem;
