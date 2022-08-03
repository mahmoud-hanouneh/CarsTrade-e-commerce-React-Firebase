const userReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                isLogged: true,
                displayName: action.payload
            }
        case 'DROP_USER':
            return {
                ...state,
                isLogged: false
            }
        default:
            return state
    }
}

export default userReducer