import React, {useState} from "react";
import './Auth.scss';
import {useNavigate} from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        console.log('Login', login)
        console.log('Password', password)
        if(login && password) navigate('/users')
    }
    return(
        <div className='authWrapper'>
            <h1>Вход</h1>
            <form onSubmit={e => {
                e.preventDefault()
                submit()
            }}>
                <div className='login'>
                    <div className='login-title'>Логин</div>
                    <input type="text" onChange={e => {
                        setLogin(e.target.value)
                    }}/>
                </div>
                <div className='password'>
                    <div className='password-title'>Пароль</div>
                    <input type="password" onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                </div>

                <button>Войти</button>
            </form>
        </div>
    )
}
