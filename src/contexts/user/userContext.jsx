import { createContext, useState, useReducer } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import userReducer from './UserReducer'
const UserContext = createContext()

export const UserProvider = ( { children } ) => {

    const userState = {
        isLogged: false,
        name: ''
    }
    const [state, dispatch] = useReducer(userReducer, userState)

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch( { type: 'SET_USER' } )
        } else {
            dispatch( { type: 'DROP_USER' } )
        }
    })
    return <UserContext.Provider value={{
        state,
        dispatch
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext