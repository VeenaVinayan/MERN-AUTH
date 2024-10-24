import {Navbar,Nav,Container,NavDropdown,Badge} from 'react-bootstrap';
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import { toast } from 'react-toastify';
import ProfileScreen from '../screens/ProfileScreen';
function Header() {
  const {userInfo} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [logoutApiCall] =useLogoutMutation();

  const logoutHandler = async () =>{
      try {
         await logoutApiCall().unwrap();
         dispatch(logout());
         navigate('/login');
      }catch(err){
        toast.error();
      }
  }
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                   <Navbar.Brand href='/'> MERN Auth </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav' >
                     <Nav className='ms-auto'>
                       { userInfo ? (
                         <>
                          <NavDropdown title={userInfo.name} id='username'>
                            { userInfo.name !== 'Admin' && ( 
                              <> 
                              <LinkContainer to='/profile'>
                                 <NavDropdown.Item>
                                   Update Profile
                                 </NavDropdown.Item>
                              </LinkContainer>
                              <LinkContainer to='/viewProfile'>
                                 <NavDropdown.Item>
                                   Profile
                                 </NavDropdown.Item>
                              </LinkContainer>
                              </>
                              ) }
                              { userInfo.name === 'Admin' && (
                                 <>
                                  <LinkContainer to='/dashboard'>
                                  <NavDropdown.Item>
                                    Dashboard
                                  </NavDropdown.Item>
                               </LinkContainer>
                               </>
                              )}
                              <NavDropdown.Item onClick={logoutHandler}>
                                 Logout
                              </NavDropdown.Item>
                            
                           </NavDropdown>
                         
                         </>
                       ) : ( 
                        <>
                        <LinkContainer to='/login'>
                        <Nav.Link>
                          <FaSignInAlt /> Sign In
                        </Nav.Link>
                       </LinkContainer>
                       <LinkContainer to='/register'>
                         <Nav.Link >
                           <FaSignOutAlt /> Sign Up
                         </Nav.Link>
                       </LinkContainer>
                      </>
                       )
                      }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
