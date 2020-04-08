import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [city, setcity] = useState('');
    const [uf, setuf] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const dados = { name, email, whatsapp, city, uf };      
        
        try {
            const response = await api.post('ongs', dados);
            alert(`Seu ID: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert(`Erro: ${error}`);
        }
    }

    return (
        <div className='Register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, ajude as pessoas a encontrarem a sua Organização.</p>
                    <Link className='backLink' to='/'>
                        <FiArrowLeft size='16px' />
                    Já tenho cadastro
                </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder='Nome da Organização' value={name} onChange={e => setname(e.target.value)}
                    />
                    <input type='email' placeholder='E-mail' value={email} onChange={e => setemail(e.target.value)} />
                    <input placeholder='Whatssap' value={whatsapp} onChange={e => setwhatsapp(e.target.value)} />
                    <div className='input-group'>
                        <input placeholder='Cidade' value={city} onChange={e => setcity(e.target.value)} />
                        <input placeholder='UF' style={{ width: '80px' }} value={uf} onChange={e => setuf(e.target.value)} />
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>

                </form>
            </div>
        </div>
    );
}


