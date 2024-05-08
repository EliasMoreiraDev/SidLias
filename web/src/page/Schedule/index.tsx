import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ScheduleItem from '../../components/ScheduleItem';
import NewSchedule from '../NewSchedule';
import EditScheduleModal from '../../components/EditScheduleModel';

export interface Schedule {
  id: number;
  descricao: string;
  diasSemana: number;
  dataPrevista: Date;
}

const Schedules = () => {
  const { clienteId: clientId } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get(`/schedules/${clientId}`);
        const sortedSchedules = response.data.sort((a: Schedule, b: Schedule) => {
          return new Date(a.dataPrevista).getTime() - new Date(b.dataPrevista).getTime();
        });
        setSchedules(sortedSchedules);
      } catch (error) {
        console.error('Erro ao buscar as programações:', error);
      }
    };

    fetchSchedules();
  }, [clientId]);

  const openModalAdd = () => {
    setIsModalAddOpen(true);
  }

  const closeModalAdd = () => {
    setIsModalAddOpen(false);
  }

  const openModalEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalEditOpen(true);
  }

  const closeModalEdit = () => {
    setEditingSchedule(null);
    setIsModalEditOpen(false);
  }

  const handleDeleteSchedule = async (id: number) => {
    try {
      await api.delete(`/schedules/${id}`);
      const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
      setSchedules(updatedSchedules);
    } catch (error) {
      console.error('Erro ao excluir a programação:', error);
    }
  };

  const handleUpdateSchedules = async () => {
    try {
      const response = await api.get(`/schedules/${clientId}`);
      const sortedSchedules = response.data.sort((a: Schedule, b: Schedule) => {
        return new Date(a.dataPrevista).getTime() - new Date(b.dataPrevista).getTime();
      });
      setSchedules(sortedSchedules);
    } catch (error) {
      console.error('Erro ao buscar as programações:', error);
    }
  };

  return (
    <div>
      <h1>Agenda para o cliente {clientId}</h1>
      <button onClick={openModalAdd}>Adicionar programação</button>
      <NewSchedule isOpen={isModalAddOpen} onClose={closeModalAdd} cliente_id={clientId} setNewScheduleAdded={handleUpdateSchedules} />
      <EditScheduleModal isOpen={isModalEditOpen} onClose={closeModalEdit} schedule={editingSchedule} setSchedule={setEditingSchedule} updateSchedules={handleUpdateSchedules} />
      <div className="agenda">
        {schedules.map(schedule => (
          <ScheduleItem
            key={schedule.id}
            id={schedule.id}
            descricao={schedule.descricao}
            dataPrevista={schedule.dataPrevista}
            diasSemana={schedule.diasSemana}
            onDelete={handleDeleteSchedule}
            onEdit={() => openModalEdit(schedule)}
          />
        ))}
      </div>
    </div>
  );
};

export default Schedules;
