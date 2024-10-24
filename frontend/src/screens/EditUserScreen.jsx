import React, {useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer';
import {Form, Button} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateUserProfileMutation } from '../slices/usersApiSlice';
import {toast} from 'react-toastify';

const EditUserScreen = () => {

  const [name, setName ] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const location = useLocation();
  const { user } =location.state || {};

  const [ updateUserProfile ] = useUpdateUserProfileMutation();
  const navigate = useNavigate();

  useEffect( () =>{
     setId(user._id);
     setName(user.name);
     setEmail(user.email);
  },[user, navigate]);

  const submitHandler = async (e) =>{
     e.preventDefault();  
     try{
          const res = await updateUserProfile({id,name,email}).unwrap();
          toast.success('Successfully updated !');
          navigate('/dashboard');

     }catch(err){
         toast.error(err?. data?.message || err.error);
     }
  } 

  return (
    <div>
         <FormContainer>
          <h1> Update User ! </h1>
          <Form onSubmit={ submitHandler} >
              <Form.Group className="my-2" controlId="name" >
                  <Form.Label> Full Name</Form.Label>
                  <Form.Control 
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="email" >
                  <Form.Label>  Email</Form.Label>
                  <Form.Control 
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                  </Form.Control>
              </Form.Group>
            

              <Button type='submit'>Update Profile</Button> 
          </Form>
       </FormContainer>
    </div>
  )
}

export default EditUserScreen
