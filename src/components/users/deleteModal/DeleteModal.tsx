import React, {FC, useEffect} from "react";
import './DeleteModal.scss';

interface IProps {
    fio: string
    cityName: string
    onSubmit: (userId: string) => void
    userId: string
    modalToggle: (value: boolean) => void
}

export const DeleteModal:FC<IProps> = ({fio, cityName, onSubmit, userId, modalToggle}) => {
    const onClose = () => {
        modalToggle(false)
    }
    useEffect(() => {
        window.addEventListener('click', onClose)
        return () => window.removeEventListener('click', onClose)
    })


    return(
        <div className='deleteModalWrapper' onClick={e => e.stopPropagation()}>
            <div className='deleteModalTitle'>Удаление пользователя</div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    onSubmit(userId)
                }}
            >
                <div className='fioContainer'>
                    <span>ФИО:</span>
                    <span>{fio}</span>
                </div>
                <div className='cityContainer'>
                    <span>Город:</span>
                    <span>{cityName}</span>
                </div>
                <div className='btnWrapper'>
                    <button type='submit'>Удалить</button>
                        <button onClick={() => modalToggle(false)}
                                className='secondBtn'
                        >
                            Отмена
                        </button>
                </div>
            </form>
        </div>
    )
}
