import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';

const ProfileScreen = () => {
     const [name,setName]=useState('');
     const [email,setEmail] =useState('');

     const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
       setName(userInfo.name);
       setEmail(userInfo.email)
    }, [userInfo.setName,userInfo.setEmail]);

     const submitHandler = async (e) => {
        e.preventDefault();
        const res = await register({name,email, password}).unwrap();
        dispatch(setCredentials({...res}));
     }   
    return(
        <FormContainer>
            <h1> Sign UP</h1>
            <Form onSubmit={submitHandler}>
             <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Full Name </Form.Label>
                    <Form.Control  
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={ (e) => setName(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
                 <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address </Form.Label>
                    <Form.Control  
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}
                     ></Form.Control>
                 </Form.Group>
             
                {isLoading && <Loader /> }     
               
            </Form>
        </FormContainer>
        
    )
}

export default ProfileScreen;

