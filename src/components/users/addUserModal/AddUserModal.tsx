import React, {FC, useState} from "react";
import './AddUserModal.scss';
import {ICity} from "../Users";

interface IProps {
    onSubmit: (fio: string, cityId: number) => any
    citiesData: ICity[]
}

export const AddUserModal:FC<IProps> = ({onSubmit, citiesData}) => {
    const [name, setName] = useState('')
    const [city, setCity] = useState(0)

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
                    <select>
                        {
                            citiesData.map((city: ICity) => {
                                return (
                                    <option className='cityOption'
                                            onClick={e => {
                                                console.log('e.target', e.target)
                                                setCity(city.id)
                                            }}
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
