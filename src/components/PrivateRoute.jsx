import React from 'react'
import Spinner from './feedback/Spinner'

import useAuthentication from '../hooks/useAuthentication'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
  
  const { isLogged, checkingStatus } = useAuthentication()  
    
  if(checkingStatus) {
      return <Spinner />
  }
  return isLogged ? <Outlet /> : <Navigate to={props.route} />
}

export default PrivateRoute