import {
    GET_ALL_USERS,
    GET_ALL_USERS_FAILED,
    GET_ALL_USERS_SUCCESS
} from '../actionTypes'
const initialState = {
    loading: false,
    users: [],
    error: false,
    currentPage: 0,
    perPage: 0,
    totalCount: 0,
    errorMsg: null
}
const getAllUsers = (state = initialState, action) => {
    switch (action.type) {
        // Login
        case GET_ALL_USERS: {
            return {
                // State
                ...state,
                // Redux Store
                loading: true
            };
        }
        case GET_ALL_USERS_FAILED: {
            return {
                // State
                ...state,
                // Redux Store
                error: true,
                loading: false,
                errorMsg: action.error
            };
        }
        case GET_ALL_USERS_SUCCESS: {
            return {
                // State
                ...state,
                // Redux Store
                loading: false,
                users: state.currentPage > 1 && action.payload.users.length > 0? state.users.concat(action.payload.users): action.payload.users,
                perPage: action.payload.perPage,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount
            };
        }
        default: {
            return state;
        }
    }
};
export default getAllUsers