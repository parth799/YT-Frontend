// import React from 'react'

import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userLogin } from "../../store/Slice/authSlice";
import LoginLayout from "../loader/LoginLayout";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {

    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;

    const response = await dispatch(userLogin(loginData));
    await dispatch(getCurrentUser());
    if (response?.payload) {
      navigate("/");
    }
    window.location.reload();
  };

  if (loading) {
    return <LoginLayout />;
  }

  const googlelog = async (res) => {
    try {
      const decodedData = jwtDecode(res.credential);
      const googleData = {
        email: decodedData.email,
        sub: decodedData.sub,
      };

      const response = await dispatch(
        userLogin({ email: googleData.email, password: googleData.sub })
      );
      const user = await dispatch(getCurrentUser());
      if (user && response?.payload) {
        navigate("/");
      }
      // window.location.reload();
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen text-white p-3 flex justify-center items-start">
        <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
          <div className="flex items-center gap-2 mt-5">
            <Logo />
          </div>
          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="Username / email : "
              type="text"
              placeholder="example@gmail.com"
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter eight digit password!"
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="text-purple-600 cursor-pointer hover:opacity-70"
              >
                SignUp
              </Link>
            </p>
            <h5 className="text-center pt-4 font-Poppins text-[14px] text-white ">
              Or join with
            </h5>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(res) => {
                  googlelog(res);
                }}
                onError={() => console.log("Google auth not working!")}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
