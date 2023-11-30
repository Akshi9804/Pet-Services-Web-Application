import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout';
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import UserProfile from './components/profile/userProfile';
import Products from './components/products/Products'
import AdminProfile from './components/profile/AdminProfile'
import ManageProducts from './components/manage/manageProducts';
import ManageAdmins from './components/manage/manageAdmins';
import ManageUsers from './components/manage/manageUsers';

function App() {
  const routerObj=createBrowserRouter([
    
    {
      path:'/',
      element:<RootLayout />,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/signup',
          element:<Signup />
        },
        {
          path:'/login',
          element:<Login />
        },
        {
          path:'/userProfile',
          element:<UserProfile />
        },
        {
          path:'/products',
          element: <Products/>
        },
        {
          path:'/adminProfile',
          element: <AdminProfile/>
        },
        {
          path:"/manageProducts",
          element:<ManageProducts/>
        },
        {
          path:"/manageAdmins",
          element:<ManageAdmins/>,
        },
        {
          path:"/manageUsers",
          element:<ManageUsers/>
        }
      ]
    }
  ])
  return (
      
      <RouterProvider router={routerObj} />
   
  );
}

export default App;
