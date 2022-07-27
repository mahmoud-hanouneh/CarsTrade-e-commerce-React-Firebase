import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const UserContext = createContext()

export const UserProvider = ( { children } ) => {

    const [isLoggedIn, setIsLoggedIn] = useState()
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    })
    return <UserContext.Provider value={{
        isLoggedIn
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext