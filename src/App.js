import {
    createBrowserRouter,
    RouterProvider,
    Route, Outlet, Navigate,
} from "react-router-dom";
import './App.css';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

function App() {

    const currentUser = true;

    const Layout = ()=>{
        return(
            <div>
                <Navbar/>
                <div style={{display:"flex"}}>
                    <Leftbar/>
                    <Outlet />
                    <Rightbar/>
                </div>
            </div>
        )
    }

    const ProtectedRoute = ({children})=>{
        if(!currentUser){
            return <Navigate to={"/login"} />;
        }
        return children
    }

    /* Important !!!*/
    const router = createBrowserRouter([
        {
            path:"/",
            // Which layout we will use?, children
            element: (
                <ProtectedRoute>
                    <Layout/>
                </ProtectedRoute>
            ),
            children:[
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                },
            ]
        },
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
