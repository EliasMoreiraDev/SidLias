import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ScheduleItem from '../../components/ScheduleItem'; 
import NewSchedule from '../NewSchedule';

interface Schedule {
  id: number;
  descricao: string;
  diasSemana: number;
  dataPrevista: string;
}

const Schedules = () => {
  const { clienteId: clientId } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get(`/schedules/${clientId}`);
        setSchedules(response.data);
      } catch (error) {
        console.error('Erro ao buscar as programações:', error);
      }
    };

    fetchSchedules();
  }, [clientId]);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const openModalAdd = () => {
    setIsModalAddOpen(true)
  }
  function closeModalAdd(){
      setIsModalAddOpen(false);
  }
  return (
    <div>
      <h1>Programações para o cliente {clientId}</h1>
      <button onClick={openModalAdd}>Adicionar programaçao</button>
      <NewSchedule onClose={closeModalAdd} isOpen={isModalAddOpen} cliente_id={clientId}/>
      {schedules.map(schedule => (
        <ScheduleItem
          key={schedule.id}
          descricao={schedule.descricao}
          dataPrevista={schedule.dataPrevista}
          diasSemana={schedule.diasSemana}
        />
      ))}
    </div>
  );
};

export default Schedules;
