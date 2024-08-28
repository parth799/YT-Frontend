import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/login";
import { getCurrentUser } from "./store/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AuthLayout from "./components/components/AuthLayout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());    
}, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<AuthLayout authentication={false}> <Home /></AuthLayout>} />
          <Route
                        path="/search/:query"
                        element={
                            <AuthLayout authentication={false}>
                                {/* <SearchVideos /> */}
                            </AuthLayout>
                        }
                    />
          <Route
                        path="/channel/:username"
                        element={
                            <AuthLayout authentication>
                                {/* <Channel /> */}
                            </AuthLayout>
                        }
                    ></Route>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </>
  );
}

export default App;
