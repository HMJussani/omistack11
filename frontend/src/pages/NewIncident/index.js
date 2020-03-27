import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [value, setvalue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        const dados = {title, description, value };

        try {
            await api.post('incidents', dados, {
                headers: {
                    autorization: ongId,
                }
            });            
            history.push('/profile');
        } catch (error) {
            alert(`Erro: ${error}`);
        }
        
    }

    return (
        <div className='NewIncident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Desreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className='backLink' to='/profile'>
                        <FiArrowLeft size='16px' color={'E02041'} />
                    Voltar para Home
                </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input  placeholder='Título do Incidente' value={title} onChange={e => settitle(e.target.value)} />
                    <textarea  placeholder='Descrição' value={description} onChange={e => setdescription(e.target.value)} />
                    <input placeholder='Valor R$' value={value} onChange={e => setvalue(e.target.value)} />
                    <button className='button' type='submit'>Cadastrar</button>

                </form>
            </div>
        </div>
    );
}


