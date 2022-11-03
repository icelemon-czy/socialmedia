import logo from './logo.svg';
import './App.css';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

function App() {
    const Layout = ()=>{
        return(
            <div>

            </div>
        )
    }

    /* Important !!!*/
    const router = createBrowserRouter([
        {
            path:"/login",
            element: <Login/>
        },
        {
            path:"/register",
            element: <Register/>
        },
    ]);

  return (
      <div>
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
