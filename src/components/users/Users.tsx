import React, {FC} from "react";
import './Users.scss';
import {UsersTable} from './usersTable/UsersTable'
import {useNavigate} from "react-router-dom";

interface IProps {
    currentUser: string
    setCurrentUser: (value: string) => void
}

export const Users:FC<IProps> = ({currentUser, setCurrentUser}) => {

    const navigate = useNavigate()
    const logout = () => {
        setCurrentUser('')
        navigate('/auth')
    }

    return(
        <div className='usersWrapper'>
            <div className='usersVerticalBar'>
                <div className='usersVerticalBar-logo'></div>
                <div className='usersVerticalBar-title'>Пользователи</div>
            </div>
            <div className='usersContent'>
                <div className='usersContent-header'>
                    <span className='horizontalBar-userName'>{currentUser}</span>
                    <span className='horizontalBar-btn'>
                        <button onClick={logout}>Выйти</button>
                    </span>
                </div>
                <div className='usersContent-body'>
                    <div className='addNewUserBtn'>
                        <button>Добавить пользователя</button>
                    </div>
                    <div className='usersTableWrapper'>
                        <UsersTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
