import {
    GET_ALL_USERS,
    GET_ALL_USERS_FAILED,
    GET_ALL_USERS_SUCCESS
} from '../actionTypes'
import axios from 'axios';
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  `Bearer ${token}`;
    return config;
});
// API endpoint: it should be placed in .env. but for now, I am using it directly here.
const API_URL='https://gorest.co.in/public-api'

const getAllUsers  = () => {
    return {
        type: GET_ALL_USERS
    }
}
const getAllUsersFailed = (payload) => {
    return {
        type: GET_ALL_USERS_FAILED,
        payload
    }
}
const getAllUserSuccess = (payload) => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        payload
    }
}
export const getAllUsersAction = (search, currentPage = 1) => {
    return dispatch => {
        dispatch(getAllUsers())
        axios.get(`${API_URL}/users?first_name=${search}&page=${currentPage}`)
        .then(response => {
            if(response.status === 200) {
                dispatch(getAllUserSuccess(
                    {
                        users: response.data.result, 
                        currentPage: response.data._meta.currentPage, 
                        perPage: response.data._meta.perPage,
                        totalCount: response.data._meta.totalCount
                    }))
            }else {
                dispatch(getAllUsersFailed({error: 'Something went wrong, please try again later'}))
            }
        })
        .catch(error => {
            dispatch(getAllUsersFailed({error: 'Something went wrong, please try again later'}))
        })
    }
}