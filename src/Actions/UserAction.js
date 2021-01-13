import * as userActions from './ActionTypes/User';
import {reset} from "redux-form";
import axios from 'axios';

export const fetchUsers = () => {
    return (dispatch)=>{
        dispatch(fetchUser());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response=>{
                dispatch(fetchUserSuccess(response.data))

            })
            .catch(error=>{
                dispatch(fetchUserError(error))
            })
    }
}

export const saveUser = (data) => {

    return (disptach) => {
        disptach(saveUserRequest())
        axios.post("https://jsonplaceholder.typicode.com/users")
            .then(response=>{
                data['id']=response.data.id;
                disptach(saveUserSuccess(data))

            })
            .catch(error=>{
                disptach(saveUserError(error))
            })
    }
}
export const deleteUser = (userId) => {

    return (disptach) => {
        disptach(saveUserRequest())
        axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response=>{
                disptach(deleteUserSuccess(userId))
            })
            .catch(error=>{
                disptach(saveUserError(error))

            })
    }
}
export const updateUser = (userId , data) => {

    return (disptach) => {

        disptach(saveUserRequest())
        axios.patch("https://jsonplaceholder.typicode.com/users/"+userId,data)
            .then(response=>{
                disptach(updateUserSuccess(userId,data))
            })
            .catch(error=>{

               disptach(saveUserError(error))
            })
    }
}


export const fetchUser = () => {

    return {
        type: userActions.USER_FETCH_REQUEST
    }
}

export const fetchUserSuccess = (users) => {
    return {
        type: userActions.USER_FETCH_SUCCESS,
        payload: users
    }
}

export const fetchUserError = (error) => {
    return {
        type: userActions.USER_FETCH_ERROR,
        payload: error
    }
}

export const saveUserRequest= () => {

    return {
        type: userActions.USER_SAVE_REQUEST
    }
}

export const saveUserSuccess = (user) => {
    return {
        type: userActions.USER_SAVE_SUCCESS,
        payload: user
    }
}
export const    updateUserSuccess = (userId ,data) => {

    return {
        type: userActions.USER_UPDATE_SUCCESS,
        payload: userId,
        data
    }
}

export const saveUserError = (error) => {
    return {
        type: userActions.USER_SAVE_ERROR,
        payload: error
    }
}
export const    deleteUserSuccess = (userId ,data) => {

    return {
        type: userActions.USER_DELETE_SUCCESS,
        payload: userId
    }
}


