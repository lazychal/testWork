import React, {FC, useEffect, useState} from "react";
import './Users.scss';
import {UsersTable} from './usersTable/UsersTable'
import {useNavigate} from "react-router-dom";
import {generateId} from "../idGenerator/idGenerator";
import {UserModal} from "./userModal/UserModal";
import {CitiesAPI} from "../../servises/api/citiesAPI";
import {UserAPI} from "../../servises/api/userAPI";

interface IProps {
    currentUser: string
    setCurrentUser: (value: string) => void
}

export interface IUser {
    id: string
    fio: string
    cityId: number
}
export interface ICity {
    id: number
    name: string
}

// const citiesData: ICity[] = [
    // {id: 0, name: 'Москва'},
    // {id: 1, name: 'Екатеринбург'},
    // {id: 2, name: 'Новосибирск'},
    // {id: 3, name: 'Бобруйск'},
    // {id: 4, name: 'Джексвилл'},
    // {id: 5, name: 'Нью-Йорк'},
    // {id: 6, name: 'Винтерфелл'},
    // {id: 7, name: 'Флорида'},
    // {id: 8, name: 'Тюмень'},
    // {id: 9, name: 'Улан-Батор'},
    // {id: 10, name: 'Казань'},
// ]

const usersData: IUser[] = [
    {id: generateId(), fio: 'Петров Пётр Петрович', cityId: 2},
    {id: generateId(), fio: 'Иванов Иван Иванович', cityId: 1},
    {id: generateId(), fio: 'Сидоров Сидор Сидорович', cityId: 35},
    {id: generateId(), fio: 'Васильев Василий Васильевич', cityId: 35},
    {id: generateId(), fio: 'Маклауд Дункан Маклаудович', cityId: 53},
    {id: generateId(), fio: 'Коннор Джон Кайлович', cityId: 53},
    {id: generateId(), fio: 'Таргариен Дейнерис Эйрисовна', cityId: 2},
    {id: generateId(), fio: 'Уайт Уолтер Хайзенбергович', cityId: 1},
    {id: generateId(), fio: 'Сноу Джон Эддардович', cityId: 35},
    {id: generateId(), fio: 'Пинкман Джесси Карлович', cityId: 53},
    {id: generateId(), fio: 'Харламов Гарик Харламович', cityId: 35},
    {id: generateId(), fio: 'Пирожков Артур Артурович', cityId: 1},
    {id: generateId(), fio: 'Батрудинов Тимур Башарович', cityId: 1}
]
export const Users:FC<IProps> = ({currentUser, setCurrentUser}) => {

    const [rows, setRows] = useState<IUser[]>(usersData.sort((a, b) => (a.fio < b.fio ? -1 : 1)))
    const [citiesData, setCitiesData] = useState<ICity[]>([])
    const normalizeData = (obj: any) => {
        return {
            id: +obj.id,
            name: obj.name
        }
    }
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // setIsLoading(true)
        CitiesAPI.getCities()
            .then(res => {
                if(citiesData.length === 0) {
                    let data = citiesData
                    res.forEach((obj: any) => {

                        data.push(normalizeData(obj))
                    })
                    setCitiesData(data)
                }

            })
            .then(() => setIsLoading(false))
    }, [citiesData])
    const navigate = useNavigate()
    const logout = () => {
        setCurrentUser('')
        navigate('/auth')
    }
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const getCityId = (name: string) => {
        return citiesData.filter(city => city.name === name)[0].id
    }
    const addUser = (fio: string, cityName: string) => {
        let newUser: IUser = {
            id: generateId(),
            fio: fio,
            cityId: getCityId(cityName)
        }
        UserAPI.addUser(fio, newUser.id, newUser.cityId)
        setRows([...rows, newUser].sort((a, b) => (a.fio < b.fio ? -1 : 1)))
        setShowAddModal(false)
    }
    const editUser = (fio: string, cityName: string, userId: string | undefined) => {
        let newUser: IUser = {
            id: userId!,
            fio: fio,
            cityId: getCityId(cityName)
        }
        UserAPI.editUser(fio, userId!, newUser.cityId)
        let newData = rows.map(row => {
            if(row.id === userId) {
                return newUser
            } else {
                return row
            }
        })
        setRows(newData.sort((a, b) => (a.fio < b.fio ? -1 : 1)))
        setShowEditModal(false)
    }
    const deleteUser = (userId :string) => {
        UserAPI.deleteUser(userId)
        let newData = rows.filter(row => row.id !== userId)
        setRows(newData.sort((a, b) => (a.fio < b.fio ? -1 : 1)))
    }
    console.log(rows)
    console.log(showEditModal)
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
                        <button onClick={() => setShowAddModal(true)}>Добавить пользователя</button>
                    </div>
                    {
                        showAddModal &&
                        <UserModal
                            onSubmit={addUser}
                            citiesData={citiesData}
                            modalToggle={setShowAddModal}
                            modalTitle='Добавление пользователя'
                            primaryBtnTitle='Добавить'
                            secondBtn={false}
                        />
                    }
                    <div className='usersTableWrapper'>
                        {
                            !isLoading &&
                            <UsersTable rows={rows}
                                        citiesData={citiesData && citiesData}
                                        showModal={showEditModal}
                                        modalToggle={setShowEditModal}
                                        editUser={editUser}
                                        deleteUser={deleteUser}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
