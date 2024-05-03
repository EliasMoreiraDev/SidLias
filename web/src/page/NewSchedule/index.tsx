import api from '../../api';
import Input from '../../components/Input';
import Select from '../../components/Select';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

function NewSchedule({ isOpen, onClose, cliente_id }: { isOpen: boolean; onClose: () => void; cliente_id: string | undefined }) {
    const history = useNavigate();
    const [descricao, setDescricao] = useState('');
    const [diasSemana, setDiasSemana] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

    async function createPost(e: FormEvent) {
        e.preventDefault();
    
        try {
            // Criar um objeto de data/hora combinando os valores de data e hora
            const dataHora = new Date(`${data}T${hora}`);
    
            // Converter o objeto de data/hora para o formato de data e hora esperado pelo banco de dados
            const dataHoraFormatada = dataHora.toISOString().slice(0, 19).replace('T', ' ');
    
            // Enviar os dados formatados para o servidor
            await api.post('/cadastro-schedules', {
                descricao,
                diasSemana,
                dataPrevista: dataHoraFormatada,
                cliente_id
            });
    
            alert('Cadastro realizado com sucesso');
            onClose(); // Fecha o modal após o cadastro bem-sucedido
        } catch (error) {
            console.error('Erro no Cadastro:', error);
            alert('Erro no Cadastro');
        }
    }
    

    if (!isOpen) return null;
    return (
        <div className='caixa_newProject'>
            <div className='modal_overlay'>
                <div className='modal'>
                    <h1 className='titulo'>Criar Programação</h1>
                    <span onClick={onClose} className="material-symbols-outlined" id='close_button'>
                        close
                    </span>

                    <form onSubmit={createPost}>
                        <Input name='descricao' label='Descrição' value={descricao} onChange={(e) => { setDescricao(e.target.value) }} />
                        <Input name='data' label='Data' type='date' value={data} onChange={(e) => { setData(e.target.value) }} />
                        <Input name='hora' label='Hora' type='time' value={hora} onChange={(e) => { setHora(e.target.value) }} />

                        <Select options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]} name='diasSemana' label='Dia da semana' value={diasSemana} onChange={(e) => { setDiasSemana(e.target.value) }} />
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewSchedule;
