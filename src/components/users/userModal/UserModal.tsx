import React, {FC, useEffect, useState} from "react";
import './UserModal.scss';
import {ICity} from "../Users";

interface IProps {
    onSubmit: any
    citiesData: ICity[]
    modalToggle: (value: boolean) => void
    modalTitle: string
    primaryBtnTitle: string
    secondBtn: boolean
    editData?: string[]
}

export const UserModal:FC<IProps> =
    ({onSubmit, citiesData, modalToggle, modalTitle,
         primaryBtnTitle, secondBtn, editData}) => {
    const [name, setName] = useState(editData ? editData[0] : '')
    const [city, setCity] = useState(editData ? editData[1] : 'Москва')
    const [userId, setUserId] = useState(editData ? editData[2] : '')

    const onClose = () => {
        modalToggle(false)
    }
    useEffect(() => {
        window.addEventListener('click', onClose)
        return () => window.removeEventListener('click', onClose)
    })


    return(
        <div className='addUserWrapper' onClick={e => e.stopPropagation()}>
            <div className='addUserTitle'>
                { modalTitle }
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if(editData) {
                        onSubmit(name, city, userId)
                    } else {
                        onSubmit(name, city)
                    }
                }}
            >
                <div className='inputContainer'>
                    <span>ФИО:</span>
                    <input type="text"
                           autoFocus
                           onChange={e => setName(e.target.value)}
                           value={name}
                    />
                </div>
                <div className='inputContainer'>
                    <span>Город:</span>
                    <select onChange={e => {
                        setCity(e.target.value)
                    }}
                            value={city}
                    >
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
                <div className='btnWrapper'>
                    <button type='submit'>{primaryBtnTitle}</button>
                    {
                        secondBtn &&
                        <button onClick={() => modalToggle(false)}
                                className='secondBtn'
                        >
                            Отмена
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}
