import React from 'react'
import  {useState} from 'react'
import {Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer'; 
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useAddUserMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const AddUserScreen = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword ] =useState();
    const [ confirmPassword, setConfirmPassword] =useState();
   
    const [ userAdd , isLoading] = useAddUserMutation();
    const navigate = useNavigate();

    const submitHandler = async (e) =>{
        e.preventDefault();
         console.log('Inside Submit Handler !!');
         if( name ==='' || email ==='' || password === ''){
             toast.error("Validation Error !!");
         } 
         if( password !== confirmPassword){
             toast.error("Password doesn't match !!");
        }
        const res =  await userAdd({name,email,password}).unwrap();
        toast.success(' User Successfully Added !');
        navigate('/dashboard');
    }
  return (
    
    <FormContainer  className='justify-content-center aligin-items-center m-3'>
    <h1> Add a new User  ! </h1>

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
        <Form.Group className='my-2' controlId='password'>
                    <Form.Label> Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='passwordConfirm'>
                    <Form.Label>Confirm  Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder='Enter Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
        </Form.Control>
        </Form.Group>


        <Button type='submit'>Create User </Button> 
     </Form>
    </FormContainer>

  )
}

export default AddUserScreen ;


  
