import * as userActions from "../Actions/ActionTypes/User";


const initialState = {
    loading: false,
    users: [],
    error: '',
    update: false
}
const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case userActions.USER_FETCH_REQUEST:
            return {
                ...state, loading: true
            }
        case userActions.USER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case userActions.USER_FETCH_ERROR:
        case userActions.USER_SAVE_ERROR:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        case userActions.USER_SAVE_REQUEST:
            return {
                ...state, loading: true
            }
        case userActions.USER_SAVE_SUCCESS:
            // return {...state, users: temp, loading: false, error: ''}
            return {...state, users: [action.payload, ...state.users], loading: false, error: ''}
        case userActions.USER_UPDATE_SUCCESS:
            return {...state, loading: false, error: '' ,users: state.users.map((user)=>user.id===action.payload?action.data:user)}
        case userActions.USER_DELETE_SUCCESS:
            return {...state, loading: false, error: '' ,users:state.users.filter(user=>user.id!==action.payload)}
        default:
            return state;
    }

}

export default UserReducer