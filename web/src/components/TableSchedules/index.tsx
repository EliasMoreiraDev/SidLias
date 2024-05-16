import React from 'react';
import { Schedule, Status } from '../../page/Schedule'; 
import Loader from '../Loader';
import NoItem from '../NoItem';
import '../../page/Schedule/style.css'

interface ScheduleTableProps {
  schedules: Schedule[];
  status: Status[] | null;
  isLoading: boolean;
  onDeleteSchedule: (id: number) => void;
  onEditSchedule: (schedule: Schedule) => void;
  onOpenModalStatus: (statusId: number) => void;
  onOpenModalAddStatus: (scheduleId: number) => void;
  onOpenConfirmation: (id: number) => void;
  formatDateTime: (dateTime: Date) => { formattedDate: string; formattedTime: string };
  getDayOfWeekInPortuguese: (day: number) => string;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  schedules,
  status,
  isLoading,
  onDeleteSchedule,
  onEditSchedule,
  onOpenModalStatus,
  onOpenModalAddStatus,
  onOpenConfirmation,
  formatDateTime,
  getDayOfWeekInPortuguese
}) => (
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
                <td className='diasemana-item'>{getDayOfWeekInPortuguese(schedule.diasSemana)}</td>
                <td className='status-item'>
                  {status &&
                    <button className='status-button' onClick={() => onOpenModalStatus(
                      status
                        .filter(item => item.programacao_id === schedule.id)
                        .map(item => item.id)[0]
                    )}>
                      <span className="status-text">
                        {status
                          .filter(item => item.programacao_id === schedule.id)
                          .map(item => item.status)[0]
                        }
                      </span>
                      {status.filter(item => item.programacao_id === schedule.id).length > 0 && (
                        <span className="material-symbols-outlined icon">
                          open_in_new
                        </span>
                      )}
                    </button>
                  }

                  {!status || status.filter(item => item.programacao_id === schedule.id).length === 0 && <button onClick={() => onOpenModalAddStatus(schedule.id)} className='add-status-button'> + Add Status</button>}

                </td>
                <td className="buttons-editdel ">

                  <button className="delete-button" onClick={() => onOpenConfirmation(schedule.id)}>
                    <div className="sign">
                      <span className="material-symbols-outlined" id='edit_icon'>
                        delete
                      </span>
                    </div>
                  </button>

                  <button className="edit-button" onClick={() => onEditSchedule(schedule)}>
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
  </div>
);

export default ScheduleTable;
