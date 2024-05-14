import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

import { format } from 'date-fns';
import './style.css';
import PageHeader from '../../components/PageHeader';
import NewSchedule from '../NewSchedule';
import EditScheduleModal from '../../components/EditScheduleModel';
import Loader from '../../components/Loader';
import NoItem from '../../components/NoItem';
import Confirmation from '../../components/Confirmacao';
import AddStatus from '../AddStatus';

export interface Schedule {
  id: number;
  descricao: string;
  diasSemana: number;
  dataPrevista: Date;
}
interface Status {
  id: number;
  descricao: string;
  status: string;
  data: string;
  programacao_id: number;
  usuario: string
}

const Schedules = () => {
  const { clienteId: clientId } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalAddStatusOpen, setIsModalAddStatusOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<number | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [status, setStatus] = useState<Status[] | null>(null);

  const statusNames = [
    { value: '0', label: 'Pedido' },
    { value: '1', label: 'Em Produção' },
    { value: '2', label: 'Finalizado' },
    { value: '3', label: 'Aguardando Aprovação' },
    { value: '4', label: 'Aprovado' },
    { value: '5', label: 'Publicado' },
    { value: '6', label: 'IMP' },
    { value: '7', label: 'Relatório' }
  ]
  const getStatusLabel = (statusCode: string) => {
    const statusCodeNumber = parseInt(statusCode, 10);
    const statusObject = statusNames.find(status => status.value === statusCode.toString());
    return statusObject ? statusObject.label : ''; 
  };
  

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

      const statusPromises = sortedSchedules.map(async (schedule: Schedule) => {
        try {
          const statusResponse = await api.get(`/status/${schedule.id}`);
          const statusData: Status[] = statusResponse.data;
          console.log(statusData)
          setStatus(statusData)

        } catch (error) {
          console.error('Erro ao buscar o status:', error);
          return null;
        }
      });
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
  };

  const closeModalAdd = () => {
    setIsModalAddOpen(false);
  };
  const openModalAddStatus = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
    setIsModalAddStatusOpen(true);
  };

  const closeModalAddStatus = () => {
    setIsModalAddStatusOpen(false);
  };

  const openModalEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setEditingSchedule(null);
    setIsModalEditOpen(false);
  };

  const handleDeleteSchedule = async (id: number) => {
    try {
      await api.delete(`/schedules/${id}`);
      const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
      setSchedules(updatedSchedules);
      fetchSchedules();
      closeConfirmation();
    } catch (error) {
      console.error('Erro ao excluir a programação:', error);
    }
  };

  const formatDateTime = (dateTime: Date) => {
    const formattedDate = format(dateTime, 'dd/MM/yyyy');
    const formattedTime = format(dateTime, 'HH:mm');
    return { formattedDate, formattedTime };
  };

  const openConfirmation = (id: number) => {
    setScheduleToDelete(id);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
    setScheduleToDelete(null);
  };

  return (
    <div>
      <PageHeader link='/cliente' title='Programações do cliente' />
      <button onClick={openModalAdd} className="button-add" type="button">
        <span className="button__text">Add Item</span>
        <span className="material-symbols-outlined button__icon" id='edit_icon' >
          add
        </span>
      </button>
      <NewSchedule isOpen={isModalAddOpen} onClose={closeModalAdd} cliente_id={clientId} setNewScheduleAdded={fetchSchedules} />
      <EditScheduleModal isOpen={isModalEditOpen} onClose={closeModalEdit} schedule={editingSchedule} setSchedule={setEditingSchedule} updateSchedules={fetchSchedules} />
      <AddStatus isOpen={isModalAddStatusOpen} onClose={closeModalAddStatus} programacao_id={selectedScheduleId} setAddStatusAdded={fetchSchedules} />
      <div className="agenda">
        {isLoading ? (
          <Loader />
        ) : (
          schedules.length === 0 ? (
            <NoItem text='Não há programações cadastradas...' />
          ) : (
            <table className='table-schedules'>
              <thead>
                <tr>
                  <th className='descricao-titulo'>Descrição</th>
                  <th className='data-titulo'>Data</th>
                  <th className='hora-titulo'>Hora</th>
                  <th className='diasem-titulo'>Dia da Semana</th>
                  <th className='status-titulo'>Status</th>
                  <th className='acoes-titulo'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(schedule => (
                  <tr key={schedule.id}>
                    <td className='descricao-item'>{schedule.descricao}</td>
                    <td className='data-item'>{formatDateTime(schedule.dataPrevista).formattedDate}</td>
                    <td className='hora-item'>{formatDateTime(schedule.dataPrevista).formattedTime}</td>
                    <td className='status-item'>{getDayOfWeekInPortuguese(schedule.diasSemana)}</td>
                    <td>
                      {status &&
                        <a href="">
                          {status
                            .filter(item => item.programacao_id === schedule.id)
                            .map(item => getStatusLabel(item.status))}
                        </a>
                      }
                      {!status || status.filter(item => item.programacao_id === schedule.id).length === 0 && <button onClick={() => openModalAddStatus(schedule.id)}> + Add Status</button>}
                    </td>
                    <td className="buttons-editdel ">

                      <button className="delete-button" onClick={() => openConfirmation(schedule.id)}>
                        <div className="sign">
                          <span className="material-symbols-outlined" id='edit_icon'>
                            delete
                          </span>
                        </div>
                      </button>

                      <button className="edit-button" onClick={() => openModalEdit(schedule)}>
                        <div className="sign">
                          <span className="material-symbols-outlined" id='edit_icon'>
                            edit
                          </span>
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
        <Confirmation
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          onConfirm={() => {
            if (scheduleToDelete !== null) {
              handleDeleteSchedule(scheduleToDelete);
            }
          }}
          text="Tem certeza que deseja excluir este item?"
        />
      </div>
    </div>
  );
};

const getDayOfWeekInPortuguese = (day: number) => {
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return daysOfWeek[day];
};

export default Schedules;
