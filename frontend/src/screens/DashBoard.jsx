import React, { useEffect, useState } from 'react';
import { Table, Button, InputGroup, Form ,Container} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDashboardMutation, useDeleteUserMutation } from '../slices/usersApiSlice';
import {setUsersData} from '../slices/userDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [ search, setSearch] = useState();
  const [ result, setResult] =useState ();
  const [dashboard] = useDashboardMutation();
  const [userId, setUserId] = useState();
  const [ deleteUser ] = useDeleteUserMutation();

  const dispatch = useDispatch();
  const user = useSelector( (state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboard().unwrap(); // Get the response from the API
        const userArray = res.user;
        setUsers(userArray); // Update the users state
        dispatch(setUsersData(res.user));
        console.log("Users from Store ::"+ JSON.stringify(user));
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
  
const editUserAdmin = async (user) => {
    console.log("Edit User !! "+ user);
    navigate('/editUser', {state: {user} });

}
const searchUser = async (e) => {
  e.preventDefault();
  console.log("Search User !!");
  const userDetails = users.filter( user => user.email === search || user.name=== search)
  console.log(userDetails[0]);
  setResult(userDetails[0]);
}

 return (
      <Container  className='justify-content-center aligin-items-center m-3'>
      <h3>Admin Dashboard</h3>

       <Button variant="secondary" size="lg" onClick={() => navigate('/addUser')} > Add User</Button>
       <hr />
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
                  <Button variant="outline-light" size="sm" onClick={() => editUserAdmin(user)} >Edit</Button>
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
      <br />
      <hr />
       <h5> Search User Here !!</h5>
      <div className='m-3'>
      <InputGroup>
        <Form.Control type="text"
                      placeholder="Type your search..." 
                      value={search}
                       onChange={(e) => setSearch(e.target.value)} />
        <Button variant='secondary' onClick={searchUser}  > 
           Search
        </Button>
      </InputGroup>
      { result && (
          <div className=''>
              <h5> {result.name} </h5>
              <h6> { result.email} </h6>
          </div>
      ) 
    }
    </div>
    </Container>
    );
};

export default DashBoard;
