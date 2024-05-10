import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ScheduleItem from '../../components/ScheduleItem';
import NewSchedule from '../NewSchedule';
import EditScheduleModal from '../../components/EditScheduleModel';
import Loader from '../../components/Loader'; 
import './style.css'
import PageHeader from '../../components/PageHeader';
import NoSchedule from '../../components/NoSchedule';


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
  const [isLoading, setIsLoading] = useState(false); // Adicionado

  useEffect(() => {
    fetchSchedules();
  }, [clientId]);

  const fetchSchedules = async () => {
    setIsLoading(true); 
  
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const response = await api.get(`/schedules/${clientId}`);
      const sortedSchedules = response.data.sort((a: Schedule, b: Schedule) => {
        return new Date(a.dataPrevista).getTime() - new Date(b.dataPrevista).getTime();
      });
      setSchedules(sortedSchedules);
    } catch (error) {
      console.error('Erro ao buscar as programações:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  };

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
      fetchSchedules()
    } catch (error) {
      console.error('Erro ao excluir a programação:', error);
    }
  };

  const handleUpdateSchedules = async () => {
    fetchSchedules();
  };

  return (
    <div>
      <PageHeader link='/cliente' title='Programações do cliente'/>
      <button onClick={openModalAdd} className="button-add" type="button">
        <span className="button__text">Add Item</span>
        <span  className="material-symbols-outlined button__icon" id='edit_icon' >
          add
        </span>
      </button>
      <NewSchedule isOpen={isModalAddOpen} onClose={closeModalAdd} cliente_id={clientId} setNewScheduleAdded={handleUpdateSchedules} />
      <EditScheduleModal isOpen={isModalEditOpen} onClose={closeModalEdit} schedule={editingSchedule} setSchedule={setEditingSchedule} updateSchedules={handleUpdateSchedules} />
      <div className="agenda">
      {isLoading ? ( 
        <Loader />
      ) : (
        schedules.length === 0 ? (
          <NoSchedule/>
        ) : (
          schedules.map(schedule => (
            <ScheduleItem
              key={schedule.id}
              id={schedule.id}
              descricao={schedule.descricao}
              dataPrevista={schedule.dataPrevista}
              diasSemana={schedule.diasSemana}
              onDelete={handleDeleteSchedule}
              onEdit={() => openModalEdit(schedule)}
            />
          ))
        )
      )}
        
      </div>
    </div>
  );
};

export default Schedules;
