import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Container, Form, Image, Row, Col, Button } from 'react-bootstrap';
import { useProfileImageMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail] =useState('');
    const [imageUrl,setImageUrl] = useState('');

    const [ profileImage ] = useProfileImageMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    
    useEffect(() => {
       setName(userInfo.name);
       setEmail(userInfo.email)
    }, [userInfo.setName,userInfo.setEmail]);

    //  const submitHandler = async (e) => {
    //     e.preventDefault();
    //     const res = await register({name,email, password}).unwrap();
    //     dispatch(setCredentials({...res}));
    //  } 
     function handleImage(e){
            const file= e.target.files[0];
            if(file) {
                const image = URL.createObjectURL(file);
                setImageUrl(image);
                console.log(imageUrl);
            }
        }  
      async function handleSubmit(e){
           e.preventDefault();
           console.log("Inside Submit Handler !!");
           await profileImage({imageUrl}).unwrap();
       }
    return(
        <Container className='justify-content-center aligin-items-center m-3'>

            {userInfo.imageUrl? (
                <>
                   <Row>
                      <Col>
                           <Image src={imageUrl} rounded />
                      </Col>
                   </Row>
                </>
             ):(
                <Form onSubmit={handleSubmit}>
                { !imageUrl?  ( 
                    <Form.Group controlId="formFile" className="mb-3">
                       <Form.Control size='sm'
                                     type="file"
                                     onChange={handleImage} />
                       <Form.Label>Choose your Profile Picture </Form.Label> 
                       </Form.Group>
                       
                   ):(
                        <div className='d-flex flex-column align-items-center gap-2'>
                         <Image src={imageUrl} rounded alt="Profile Picture" width="200" height="180" />
                         <Button type='submit' variant='secondary' size="sm" className="mt-2">Set Image</Button>
                        </div>
                   )}           
                </Form> 
            ) }

            <Row>
                <Col xs={6} md={4} className='aligin-items-center'>
                   <h4>{userInfo.name}</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={4} className='aligin-items-center' >
                   <h6>{userInfo.email}</h6>
                </Col>
            </Row>
            
        </Container>
    )
}
export default ProfileScreen;

