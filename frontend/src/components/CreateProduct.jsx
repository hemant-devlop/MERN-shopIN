import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const CreateProduct = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const imagefile = watch("image");
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const formData = new FormData();
            if (data.image && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("brand", data.brand);
            formData.append("category", data.category);

            const res = await axios.post("https://mern-shopin.onrender.com /api/products", formData, { withCredentials: true });
            // dispatch(login(res.data.user));
            console.log(res.data)
            alert(res.data.message || "Product created successfully!");
            reset();
            // navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 ">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Create Product</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Profile */}
                        <div className="form-control  mb-3 flex flex-col ">
                            <div className="avatar items-center ">
                                <div className="w-40 rounded-2xl me-2">
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
                                    {...register("image", { required: "Product image is required" })}
                                    className="file-input " />
                            </div>
                        </div>
                        {/* name */}
                        <div className="form-control  mb-3 flex flex-col ">
                            <input
                                type="text"
                                placeholder="Product Name"
                                {...register("name", { required: "Product name is required" })}
                                className="input input-bordered mx-auto"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                        </div>
                        {/* description */}
                        <div className="form-control  mb-3 flex flex-col ">
                            <textarea 
                                type="text"
                                placeholder="Product Description"
                                {...register("description", { required: "Product description is required" })}
                                className="input input-bordered mx-auto h-20 resize-none"
                            />
                            {errors.description && (
                                <span className="text-red-500 text-sm">{errors.description.message}</span>
                            )}
                        </div>
                        {/* Product Price */}
                        <div className="form-control  mb-3 flex flex-col ">
                            <input
                                type="text"
                                placeholder="Product Price"
                                {...register("price", { required: "Product price is required" })}
                                className="input input-bordered mx-auto"
                            />
                            {errors.price && (
                                <span className="text-red-500 text-sm">{errors.price.message}</span>
                            )}
                        </div>
                        {/* Product brand */}
                        <div className="form-control  mb-3 flex flex-col ">
                            <input
                                type="text"
                                placeholder="Product Brand"
                                {...register("brand", { required: "Product brand is required" })}
                                className="input input-bordered mx-auto"
                            />
                            {errors.brand && (
                                <span className="text-red-500 text-sm">{errors.brand.message}</span>
                            )}
                        </div>
                        {/* address */}
                        <div className="form-control  mb-3 flex flex-col ">

                            <select {...register("category")} className="input input-bordered mx-auto">
                                <option value="">Select Category</option>
                                <option value="general">General</option>
                                <option value="tech">Tech</option>
                                <option value="man">Man</option>
                                <option value="woman">Woman</option>
                                <option value="child">Child</option>
                            </select>
                            {errors.category && (
                                <span className="text-red-500 text-sm">{errors.category.message}</span>
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

export default CreateProduct;
