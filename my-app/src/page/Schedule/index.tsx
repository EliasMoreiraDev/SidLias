import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ScheduleItem from '../../components/ScheduleItem'; 

interface Schedule {
  id: number;
  descricao: string;
  diasSemana: number;
  dataPrevista: string;
}

const Schedules = () => {
  const { clienteId } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get(`/schedules/${clienteId}`);
        setSchedules(response.data);
      } catch (error) {
        console.error('Erro ao buscar as programações:', error);
      }
    };

    fetchSchedules();
  }, [clienteId]);

  return (
    <div>
      <h1>Programações para o cliente {clienteId}</h1>
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
