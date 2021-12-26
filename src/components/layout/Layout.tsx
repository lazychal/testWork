import React, {useState} from "react";
import './Layout.scss';
import {Route, Routes} from "react-router-dom";
import App from "../../App";
import {Auth} from "../auth/Auth";
import {Users} from "../users/Users";

export  const Layout = () => {
    const [currentUser, setCurrentUser] = useState('')
    return(
        <div className='layoutWrapper'>
            <Routes>
                {/*<Route path="/" element={<App />}/>*/}
                <Route path="auth" element={<Auth setCurrentUser={setCurrentUser}/>} />
                <Route path="users" element={<Users currentUser={currentUser}
                                                    setCurrentUser={setCurrentUser}/>} />
            </Routes>
        </div>
    )
}
