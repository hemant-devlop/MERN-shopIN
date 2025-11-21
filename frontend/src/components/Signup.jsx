import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://mern-shopin.onrender.com/api/users/register", data);
      alert(res.data.message || "Signup successful!");
      reset();
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 ">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile */}
            {/* <div className="form-control  mb-3 flex flex-col ">
              image
              <div className="avatar items-center ">
                <div className="w-18 rounded-full me-2">
                  {imagefile && imagefile[0] ? (
                    <img
                      src={URL.createObjectURL(imagefile[0])}
                      alt="Selected"
                      className="w-18 h-18 rounded-full"
                    />
                  ) : (
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                  )}
                </div>
                <input type="file" 
                accept="image/*"
                {...register("image")}
                className="file-input"  />
              </div>
            </div> */}
            {/* name */}
            <div className="form-control  mb-3 flex flex-col ">
              <label className="label ms-2">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered mx-auto"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-10 right-3 top-8 text-gray-500"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>

              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6 flex justify-end">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
