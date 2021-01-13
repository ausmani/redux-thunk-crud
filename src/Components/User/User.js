// @flow
import React, {useEffect, useState} from 'react';
import {fetchUsers, saveUser, updateUser , deleteUser} from "../../Actions/UserAction";
import {connect} from 'react-redux'
import Loading from "../loading";
import List from "./list";

const User = ({userData, fetchUsers, saveUser ,updateUser ,deleteUser}) => {
    const initialValues = {
        name: '',
        username: '',
        email: '',
        website: ''
    }

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }
    const [currentUserId, setCurrentUserId] = useState("")

    function resetForm() {
        setValues(initialValues)
        setCurrentUserId("")
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (currentUserId == '')
            saveUser(values);
        else{
            updateUser(currentUserId, values)
        }
        resetForm()


    }
    function delUser(userId){
        if(window.confirm("Are you sure you want to delete this user?")){
            deleteUser(userId)
        }
    }

    useEffect(() => {
        fetchUsers()

    }, [])
    useEffect(() => {
        if (currentUserId != '') {
            let users = userData.users
            let user = users.filter(function (obj) {
                return obj.id == currentUserId
            })
            user = user[0]
            setValues({name: user.name, username: user.username, email: user.email, website: user.website})
        }
    }, [currentUserId])

    if (userData.loading) {
        return <Loading/>
    } else
        return (
            <>

                <div className="col-md-4 offset-4">
                    <form onSubmit={handleSubmit} name="userform">
                        <h1>User Form</h1>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Full Name" name="name"
                                   value={values.name} onChange={handleInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" className="form-control" placeholder="Username"
                                   value={values.username} onChange={handleInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" placeholder="Email"
                                   value={values.email} onChange={handleInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input type="text" name="website" className="form-control" placeholder="Website"
                                   value={values.website} onChange={handleInputChange} required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">{currentUserId == '' ? 'Save' : 'Update'}</button>
                        </div>
                    </form>
                </div>
                <List users={userData.users} setCurrentUserId={setCurrentUserId} deleteUser={delUser}/>
            </>
        );
};

export const mapStateToProps = (state) => {

    return {
        userData: state.user
    }
}
export const mapDisptachToProps = (dispatch) => {
    return {
        updateUser: (userId,data) => dispatch(updateUser(userId,data)),
        saveUser: (data) => dispatch(saveUser(data)),
        deleteUser: (userId) => dispatch(deleteUser(userId)),
        fetchUsers: () => dispatch(fetchUsers())
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(User);
