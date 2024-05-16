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
import StatusPage from '../Status';
import Select from '../../components/Select'; // Importe o componente Select se ainda não estiver importado
import ScheduleTable from '../../components/TableSchedules';

export interface Schedule {
  id: number;
  descricao: string;
  diasSemana: number;
  dataPrevista: Date;
}

export interface Status {
  id: number;
  descricao: string;
  status: string;
  data: string;
  programacao_id: number;
  usuario: string;
}

const Schedules = () => {
  const { clienteId: clientId } = useParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalAddStatusOpen, setIsModalAddStatusOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [editingStatus, setEditingStatus] = useState<Status | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<number | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [status, setStatus] = useState<Status[] | null>(null);
  const [orderBy, setOrderBy] = useState<'recente' | 'antigo' | 'az'>('recente');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    fetchSchedules();
  }, [clientId, orderBy, selectedStatus]);

  const fetchSchedules = async () => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      let response = await api.get(`/schedules/${clientId}`);
      let fetchedSchedules: Schedule[] = response.data;

      // Ordenar as schedules de acordo com a opção selecionada
      if (orderBy === 'recente') {
        fetchedSchedules.sort((a: Schedule, b: Schedule) => {
          return new Date(b.dataPrevista).getTime() - new Date(a.dataPrevista).getTime();
        });
      } else if (orderBy === 'antigo') {
        fetchedSchedules.sort((a: Schedule, b: Schedule) => {
          return new Date(a.dataPrevista).getTime() - new Date(b.dataPrevista).getTime();
        });
      } else if (orderBy === 'az') {
        fetchedSchedules.sort((a: Schedule, b: Schedule) => {
          return a.descricao.localeCompare(b.descricao);
        });
      }

      // Filtrar as schedules de acordo com o status selecionado
      if (selectedStatus !== '') {
        if (selectedStatus === 'Sem Status') {
          fetchedSchedules = fetchedSchedules.filter(schedule => {
            const status = getStatusForSchedule(schedule.id);
            return !status;
          });
        } else {
          fetchedSchedules = fetchedSchedules.filter(schedule => {
            const status = getStatusForSchedule(schedule.id);
            return status && status.status === selectedStatus;
          });
        }
      }

      setSchedules(fetchedSchedules);

      // Obter os status para cada programação
      const statusPromises = fetchedSchedules.map(async (schedule: Schedule) => {
        try {
          response = await api.get(`/status`);
          const statusData: Status[] = response.data;
          setStatus(statusData);
        } catch (error) {
          console.error('Erro ao buscar o status:', error);
        }
      });
    } catch (error) {
      console.error('Erro ao buscar as programações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusForSchedule = (scheduleId: number): Status | undefined => {
    if (status) {
      return status.find(item => item.programacao_id === scheduleId);
    }
    return undefined;
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

  const openModalStatus = (statusId: number) => {
    if (status) {
      const foundStatus = status.find(item => item.id === statusId);
      if (foundStatus) {
        setEditingStatus(foundStatus);
        setIsModalStatusOpen(true);
      }
    }
  };

  const closeModalStatus = () => {
    setEditingStatus(null);
    setIsModalStatusOpen(false);
  };

  const handleDeleteSchedule = async (id: number) => {
    try {
      await api.delete(`/schedules/${id}`);
      const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
      setSchedules(updatedSchedules);
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

  const handleOrderByChange = (value: string) => {
    setOrderBy(value as 'recente' | 'antigo' | 'az');
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };
  const getDayOfWeekInPortuguese = (day: number) => {
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return daysOfWeek[day];
  };
  return (
    <div>
      <PageHeader link='/cliente' title='Programações do cliente'>
        <form id="search-teachers" onSubmit={fetchSchedules}>
          <Select
            label='Ordenar por'
            name='orderBy'
            value={orderBy}
            onChange={(e) => handleOrderByChange(e.target.value)}
            options={[
              { value: 'recente', label: 'Mais recente' },
              { value: 'antigo', label: 'Mais antigo' },
              { value: 'az', label: 'A-Z' }
            ]}
          />
          <Select
            label='Status'
            name='status'
            value={selectedStatus}
            option1={{ value: '', label: 'Todos os status'} }
            onChange={(e) => handleStatusChange(e.target.value)}
            options={[
              { value: '', label: 'Todos os status'},
              { value: 'Pedido', label: 'Pedido' },
              { value: 'Em Produção', label: 'Em Produção' },
              { value: 'Finalizado', label: 'Finalizado' },
              { value: 'Aguardando Aprovação', label: 'Aguardando Aprovação' },
              { value: 'Aprovado', label: 'Aprovado' },
              { value: 'Publicado', label: 'Publicado' },
              { value: 'IMP', label: 'IMP' },
              { value: 'Relatório', label: 'Relatório' },
              { value: 'Sem Status', label: 'Sem Status' } 
            ]}
          />
        </form>
      </PageHeader>
      <button onClick={openModalAdd} className="button-add" type="button">
        <span className="button__text">Add Item</span>
        <span className="material-symbols-outlined button__icon" id='edit_icon' >
          add
        </span>
      </button>
      <NewSchedule isOpen={isModalAddOpen} onClose={closeModalAdd} cliente_id={clientId} setNewScheduleAdded={fetchSchedules} />
      <EditScheduleModal isOpen={isModalEditOpen} onClose={closeModalEdit} schedule={editingSchedule} setSchedule={setEditingSchedule} updateSchedules={fetchSchedules} />
      <AddStatus isOpen={isModalAddStatusOpen} onClose={closeModalAddStatus} programacao_id={selectedScheduleId} setAddStatusAdded={fetchSchedules} />
      <StatusPage isOpen={isModalStatusOpen} onClose={closeModalStatus} status={editingStatus} setStatus={setEditingStatus} updateStatus={fetchSchedules} />
      <div className="agenda">
      <ScheduleTable
        schedules={schedules}
        status={status}
        isLoading={isLoading}
        onDeleteSchedule={handleDeleteSchedule}
        onEditSchedule={openModalEdit}
        onOpenModalStatus={openModalStatus}
        onOpenModalAddStatus={openModalAddStatus}
        onOpenConfirmation={openConfirmation}
        formatDateTime={formatDateTime}
        getDayOfWeekInPortuguese={getDayOfWeekInPortuguese}
      />
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

export default Schedules;
