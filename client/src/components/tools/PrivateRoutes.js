import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../Home';
import { AuthContext } from './context/AuthContext';

const PrivateRoutes = ({ type }) => {
    
    const { authState } = useContext(AuthContext)
    return authState.status ? <Outlet /> : <Navigate to='/login' />

        

}


export default PrivateRoutes