import { createContext, useReducer } from "react";
import loadingReducer from "./LoadingReducer";

const LoadingContext = createContext()

export const LoadingProvider = ( { children } ) => {
    const initialState = {
        loading: false
    }

    const [state, dispatch] = useReducer(loadingReducer, initialState)

    return <LoadingContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </LoadingContext.Provider>
}

export default LoadingContext