import React from 'react';
import { FiHome } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Register() {
    return (
        <div className='Register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, ajude as pessoas a encontrarem a sua Organização</p>
                    <Link className='backLink' to='/'>
                        <FiHome size='16px' />
                    Voltar
                </Link>
                </section>
                <form>
                    <input placeholder='Nome da Organização' />
                    <input type='email' placeholder='E-mail' />
                    <input placeholder='Whatssap' />
                    <div className='input-group'>
                    <input placeholder='Cidade' />
                    <input placeholder='UF' style={{width:'80px'}} />
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>

                </form>
            </div>
        </div>
    );
}


