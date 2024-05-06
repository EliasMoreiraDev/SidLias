import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ScheduleItem from '../../components/ScheduleItem'; 
import NewSchedule from '../NewSchedule';

interface Schedule {
  id: number;
  descricao: string;
  diasSemana: number;
  dataPrevista: Date;
}

const Schedules = () => {
  const { clienteId: clientId } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

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

  const openModalAdd = () => {
    setIsModalAddOpen(true)
  }

  const closeModalAdd = () => {
    setIsModalAddOpen(false);
  }

  const [newScheduleAdded, setNewScheduleAdded] = useState(false);

  useEffect(() => {
    if (newScheduleAdded) {
      // Recarregar as programações após adicionar uma nova
      const fetchSchedules = async () => {
        try {
          const response = await api.get(`/schedules/${clientId}`);
          setSchedules(response.data);
        } catch (error) {
          console.error('Erro ao buscar as programações:', error);
        }
      };

      fetchSchedules();
      setNewScheduleAdded(false);
    }
  }, [clientId, newScheduleAdded]);

  // Função para deletar um item do schedule
  const handleDeleteSchedule = async (id: number) => {
    try {
      await api.delete(`/schedules/${id}`);
      // Atualizar a lista de schedules após a exclusão
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    } catch (error) {
      console.error('Erro ao excluir a programação:', error);
    }
  };

  return (
    <div>
      <h1>Programações para o cliente {clientId}</h1>
      <button onClick={openModalAdd}>Adicionar programação</button>
      <NewSchedule isOpen={isModalAddOpen} onClose={closeModalAdd} cliente_id={clientId} setNewScheduleAdded={setNewScheduleAdded} />
      {schedules.map(schedule => (
        <ScheduleItem
          key={schedule.id}
          id={schedule.id} // Passa o id para o ScheduleItem
          descricao={schedule.descricao}
          dataPrevista={schedule.dataPrevista}
          diasSemana={schedule.diasSemana}
          onDelete={handleDeleteSchedule} // Passa a função para deletar um item
        />
      ))}
    </div>
  );
};

export default Schedules;
