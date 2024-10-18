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
import {Provider} from 'react-redux';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute  from './screens/ProfileScreen.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App />} >
          <Route index={true} path='/' element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='' element={<ProfileScreen /> } >
            <Route path='/profile' element={<ProfileScreen />} />
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
