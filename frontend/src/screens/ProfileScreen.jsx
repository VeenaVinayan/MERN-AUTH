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
        <Container className="d-flex flex-column justify-content-center align-items-center mt-3">
        {userInfo.imageUrl ? (
          <Row className="mb-3">
            <Col className="d-flex justify-content-center">
              <Image src={imageUrl} roundedCircle alt="Profile Picture" width="200" height="200" />
            </Col>
          </Row>
        ) : (
          <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            {!imageUrl ? (
              <Form.Group controlId="formFile" className="mb-3 d-flex flex-column align-items-center">
                <Form.Control
                  size="sm"
                  type="file"
                  onChange={handleImage}
                  className="w-75"
                />
                <Form.Label className="mt-2">Choose your Profile Picture</Form.Label>
              </Form.Group>
            ) : (
              <div className="d-flex flex-column align-items-center gap-2">
                <Image src={imageUrl} rounded alt="Profile Picture" width="200" height="180" />
                <Button type="submit" variant="secondary" size="sm" className="mt-2">
                  Set Image
                </Button>
              </div>
            )}
          </Form>
        )}
  
        <Row className="text-center mt-3">
          <Col xs={12} className="d-flex justify-content-center">
            <h4>{userInfo.name}</h4>
          </Col>
        </Row>
  
        <Row className="text-center">
          <Col xs={12} className="d-flex justify-content-center">
            <h6>{userInfo.email}</h6>
          </Col>
        </Row>
      </Container>
    )
}
export default ProfileScreen;

