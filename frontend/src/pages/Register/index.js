import React from 'react';
import { FiLogIn } from 'react-icons/fi'


import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Register() {
    return (
        <div className='logon-container'>
            <img src={logoImg} alt="Be The Hero" />
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}


