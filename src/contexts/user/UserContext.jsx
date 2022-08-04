import { createContext, useReducer } from "react";
import userReducer from './UserReducer'
const UserContext = createContext()

export const UserProvider = ( { children } ) => {

    const userState = {
        isLogged: false,
        displayName: ' '
    }
    const [state, dispatch] = useReducer(userReducer, userState)

    return <UserContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext
