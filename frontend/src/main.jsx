import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createBrowserRouter,
         createRoutesFromElements,
         Route,
         RouterProvider  } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute  from './components/PrivateRoute.jsx';
import DashBoard from './screens/DashBoard.jsx';
import AdminLogin from './screens/AdminLogin.jsx';
import UpdateProfile from './screens/UpdateProfile.jsx';
import AddUserScreen from './screens/AddUserScreen.jsx';
import EditUserScreen from './screens/EditUserScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App />} >
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/addUser' element={< AddUserScreen/>} />
          <Route path='/editUser' element={< EditUserScreen />} />
          <Route index={true} path='/' element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='' element={<PrivateRoute /> } >
             <Route path='/profile' element={<UpdateProfile />} />
             <Route path='/viewProfile' element={<ProfileScreen />} />
          </Route>
      </Route>
  )
); 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} > 
       <RouterProvider router= {router} / >
    </Provider>
  </StrictMode>,
)
