import { useState, useEffect } from "react";
import {Form ,Button, Row, Col} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";

import React from 'react';
import {useSelector} from  'react-redux';
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useNavigate  } from "react-router-dom";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { userInfo } = useSelector( (state) => state.auth);

  const [ email, setEmail] = useState();
  const [ name, setName] = useState();  
  const navigate = useNavigate();

  const [ UpdateProfile, { isLoading }] = useUpdateProfileMutation();
 
   useEffect( () =>{
         setEmail(userInfo.email);
         setName(userInfo.name);
   },[userInfo.email,userInfo.name]);  

  const submitHandler = async (e) => {
       e.preventDefault();
      try{
        const res = await UpdateProfile(name,email).unwrap(); 
        setCredentials({...res});
        toast.success(" Profile Successfully Updated !!! ");
        navigate('/viewProfile');
      }catch(err){
         toast.error(err?.data?.message || err.error);
      } 
  } 
  return (
    <div>
       <FormContainer>
          <h1> Update Profile ! </h1>
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
              {/* <Form.Group className="my-2" controlId="image" >
                  <Form.Label> Image </Form.Label>
                  <Form.Control 
                                type='file'
                                value={}
                                onChange={}>
                  </Form.Control>
              </Form.Group> */}
              { isLoading &&  <Loader /> }
              <Button type='submit'>Update Profile</Button> 
          </Form>
       </FormContainer>
    </div>
  )
}
export default UpdateProfile;
