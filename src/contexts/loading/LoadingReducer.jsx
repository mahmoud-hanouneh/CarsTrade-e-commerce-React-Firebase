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
        default:
            return state
    }
}

export default loadingReducer