import { useForm } from "react-hook-form";
import GetImagePreview from "../components/GetImagePreview";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  getCurrentUser,
  userLogin,
} from "../../store/Slice/authSlice.js";
import LoginLayout from "../loader/LoginLayout.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axiosIN from "../../hooks/axiosIN.js";
import { toast } from "react-toastify";

function Signup() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));
    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      const loginResult = await dispatch(userLogin({ username, password }));
      dispatch(getCurrentUser());
      if (loginResult?.type === "login/fulfilled") {
        navigate("/terms&conditions");
      } else {
        navigate("/login");
      }
    }
  };

  if (loading) {
    return <LoginLayout />;
  }
  const googlelog = async (res) => {
    const data = jwtDecode(res.credential);

    const value = {
      email: data.email,
      username: data.given_name.toLowerCase(),
      fullName: data.name,
      avatar: data.picture,
      password: data.sub,
    };

    try {
      const response = await axiosIN.post(`/users/google`, value);
      const { user, accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);
      if (response.data.success) {
        navigate("/terms&conditions");
        toast.success("Account created successfully");
      }else {
        navigate("/login");
      }

      return user;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  };
  return (
    <>
      <div className="w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8">
        <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 p-2 text-sm sm:w-96 w-full"
          >
            <div className="w-full relative h-28 bg-[#222222] ">
              <div className="w-full h-full">
                <GetImagePreview
                  name="coverImage"
                  control={control}
                  className="w-full h-28 object-cover border-none border-slate-900"
                  cameraIcon
                />
                <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
                  cover Image
                </div>
              </div>
              <div className="absolute left-2 bottom-2 rounded-full border-2">
                <GetImagePreview
                  name="avatar"
                  control={control}
                  className="object-cover rounded-full h-20 w-20 outline-none"
                  cameraIcon={true}
                  cameraSize={20}
                />
              </div>
            </div>

            {errors.avatar && (
              <div className="text-red-500">{errors.avatar?.message}</div>
            )}

            <Input
              label="Username:"
              type="text"
              placeholder="Enter your username"
              name="username"
              {...register("username", { required: "Username is required" })}
              className="h-8"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Email: "
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
              })}
              className="h-8"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <Input
              label="Fullname: "
              type="text"
              placeholder="Enter fullname"
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="h-8"
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              className="h-8"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Signup
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-purple-600 cursor-pointer hover:opacity-70"
              >
                Login
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
                onError={() => console.log("SOME THING WHAT WRONG")}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
