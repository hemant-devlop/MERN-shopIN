import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
const EditProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        if (user) {
            // setValue("image", user.avatar.);
            setValue("name", user?.name);
            setValue("address", user?.addresses);
            setValue("email", user?.email);
        }
    }, [user]);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm();

    const imagefile = watch("image");
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            if (data.image && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }
            formData.append("name", data.name);
            formData.append("address", data.address);
            formData.append("email", data.email);

            const res = await axios.post("https://mern-shopin.onrender.com/api/users/profile/edit", formData,{withCredentials:true});
            dispatch(login(res.data.user));
            alert(res.data.message || "Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 ">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Profile */}
                        <div className="form-control  mb-3 flex flex-col ">
                            <div className="avatar items-center ">
                                <div className="w-40 rounded-full me-2">
                                    {imagefile && imagefile[0] ? (
                                        <img
                                            src={URL.createObjectURL(imagefile[0])}
                                            alt="Selected"
                                        />
                                    ) : (
                                        <img src={user?.avatar?.url || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"} />
                                    )}
                                </div>
                                <input type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    className="file-input" />
                            </div>
                        </div>
                        {/* name */}
                        <div className="form-control  mb-3 flex flex-col ">
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
                        {/* address */}
                        <div className="form-control  mb-3 flex flex-col ">
                            <input
                                type="text"
                                placeholder="Your Address"
                                {...register("address")}
                                className="input input-bordered mx-auto"
                            />
                            {errors.address && (
                                <span className="text-red-500 text-sm">{errors.address.message}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-control mb-3 flex flex-col">
                            <input
                                type="email"
                                disabled
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


                        {/* Submit Button */}
                        <div className="form-control mt-6 flex flex-col  justify-end">
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
