import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { EyeIcon, EyeOffIcon, Link } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const data=watch();
const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://mern-shopin.onrender.com /api/users/login", data,{withCredentials:true});
      alert(res.data.message || "login successful!");
      // console.log(res.data);
      dispatch(login(res.data));
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 ">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <div className="form-control mb-3 flex flex-col">
              <label className="label ms-2">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="input input-bordered mx-auto"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control mb-3 relative flex flex-col">
              <label className="label ms-2">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered mx-auto"
              />
              {data.password && <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-10 right-3 top-8 text-gray-500"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>}

              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6 flex justify-end">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm">
            I don't have an account?{" "}
            <NavLink to="/signup" className="text-blue-500 hover:underline">
              signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
