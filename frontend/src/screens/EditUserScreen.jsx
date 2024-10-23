import React, {useState} from 'react'
import {Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer'; 
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const EditUserScreen = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  return (
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
         { isLoading &&  <Loader /> }

        <Button type='submit'>Update Profile</Button> 
    </Form>
 </FormContainer>
  )
}

export default EditUserScreen
