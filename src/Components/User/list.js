// @flow 
import * as React from 'react';


const List = ({users,setCurrentUserId ,deleteUser}) => {


 return (
  <>
      <table className="table table-striped">
          <thead className="thead-dark">
          <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Website</th>
              <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user,ind)=>{
              return (
                  <tr key={ind}>
                      <td>{user["name"]}</td>
                      <td>{user["username"]}</td>
                      <td>{user["email"]}</td>
                      <td>{user["website"]}</td>
                      <td><a  href="#" onClick={(e)=>{e.preventDefault();setCurrentUserId(user['id'])}}>Edit</a> | <a href="#" onClick={(e)=>{e.preventDefault();deleteUser(user['id'])}}>Delete</a> </td>
                  </tr>
              )
          })}
          </tbody>
      </table>
  </>
 );
};
export default List;