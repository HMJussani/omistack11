import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Profile() {
    const [incidents, setincidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    useEffect(() => {
        api.get('profile', {
            headers: {
                autorization: ongId,
            }
        }).then(response => {
            setincidents(response.data);
        })
    }, [ongId]);

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    autorization: ongId,
                }
            });
            setincidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert(`Erro: ${error}`);
        }
    }

    function handleLogon() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className='Profile-container'>
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className='button' to='/incidents/new'>Cadastrar novo Caso</Link>
                <button onClick={handleLogon} type='button'>
                    <FiPower size={18} color={'#e02041'} />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency', currency: 'BRL'
                        }).format(incident.value)}</p>
                        <button onClick={() => handleDelete(incident.id)} type='button'>
                            <FiTrash2 size={20} color={'#a8a8b3'} />
                        </button>
                    </li>
                ))}
            </ul>

            <Link className='backLink' to='/'>
                <FiArrowLeft size='16px' />
                    Voltar para Home
                </Link>

        </div>
    );
}