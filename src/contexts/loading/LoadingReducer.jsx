const loadingReducer = (state, action) => {
    switch(action.type) {
        case 'START_LOADING':
            return {
                ...state,
                buttonLoading: true
            }
        case 'STOP_LOADING':
            return {
                ...state,
                buttonLoading: false
            }
        case 'START_SPINNER_LOADING':
            return {
                ...state,
                spinnerLoading: true
            }
        case 'STOP_SPINNER_LOADING':
            return {
                ...state,
                spinnerLoading: false
            }
        default:
            return state
    }
}

export default loadingReducer