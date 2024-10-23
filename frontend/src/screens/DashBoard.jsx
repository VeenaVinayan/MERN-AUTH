import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDashboardMutation, useDeleteUserMutation } from '../slices/usersApiSlice';

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [dashboard] = useDashboardMutation();
  const [userId, setUserId] = useState();
  const [ deleteUser ] = useDeleteUserMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboard().unwrap(); // Get the response from the API
        const userArray = res.user;
        setUsers(userArray); // Update the users state
      } catch (err) {
        toast.error(err.message); // Handle and show error in the toast
      }
    };
    fetchData();
  }, [dashboard]); 

  const deleteUserAdmin = async (userId)=>{
     console.log('Deletete User!') ;
     try{
        const res =  await deleteUser({userId}).unwrap();
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
        toast.success(err);
     }catch(err){
        toast.error(err);
     }
  }
  
const editUserAdmin = async (userId) => {
    
}
 return (
    <div>
      <h3>Admin Dashboard</h3>
      <Table striped bordered hover size="md" variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td className='d-flex'>
                  <Button variant="outline-light" size="sm" onClick={() => editUserAdmin(user._id)} >Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteUserAdmin(user._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DashBoard;
