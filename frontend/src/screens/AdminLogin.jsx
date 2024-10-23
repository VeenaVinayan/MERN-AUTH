import {useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import {Form, Button, Row, Col} from 'react-bootstrap';
import React from 'react'
import {toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAdminMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const AdminLogin = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] =useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [admin, {isLoading}] =useAdminMutation();
     
     async function submitHandler(e){
         e.preventDefault();
        try{
            const res = await admin({email,password}).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/dashboard');

        }catch(err){
            toast.error(err?.data?.message || err.error);
        }
     }
  return (
    <div>
        <FormContainer>
            <h1> Admin Login</h1>
            <Form onSubmit={submitHandler}> 
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address </Form.Label>
                <Form.Control 
                         type='email'
                         placeholder='Enter Email'
                         value={email}
                         onChange={(e) => setEmail(e.target.value)} >
                </Form.Control>
            </Form.Group>    
            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                          type="password"
                          placeholder='Enter Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>  
            {isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3'>
                 Sign In
            </Button>
          </Form>
        </FormContainer>
    </div>
  )
}

export default AdminLogin
