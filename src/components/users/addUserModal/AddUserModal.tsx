import React, {FC, useEffect, useState} from "react";
import './AddUserModal.scss';
import {ICity} from "../Users";
import {CitiesAPI} from "../../../servises/api/citiesAPI";

interface IProps {
    onSubmit: (fio: string, cityName: string) => any
    citiesData: ICity[]
}

export const AddUserModal:FC<IProps> = ({onSubmit, citiesData}) => {
    const [name, setName] = useState('')
    const [city, setCity] = useState('Москва')



    return(
        <div className='addUserWrapper'>
            <div className='addUserTitle'>Добавление пользователя</div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    onSubmit(name, city)
                }}
            >
                <div className='inputContainer'>
                    <span>ФИО:</span>
                    <input type="text" autoFocus onChange={e => setName(e.target.value)}/>
                </div>
                <div className='inputContainer'>
                    <span>Город:</span>
                    <select onChange={e => {
                        setCity(e.target.value)
                    }}>
                        {
                            citiesData.map((city: ICity) => {
                                return (
                                    <option className='cityOption'
                                            key={city.id}
                                    >
                                        {city.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <button type='submit'>Добавить</button>
            </form>
        </div>
    )
}
