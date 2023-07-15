import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './Layout/Main';
import Registion from './Components/Registion/Registion';
import Login from './Components/Login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Registion></Registion>
        },
        {
          path: '/login',
          element: <Login></Login>
        }
      ]
    }
  ])
  return (

    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
