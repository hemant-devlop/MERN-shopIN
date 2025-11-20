import { useSelector } from "react-redux";
const ProductCard = ({ image, name, price,description,handleGetProductById,handleUpdateProduct }) => {
const {user}=useSelector(state=>state.auth)

  return (
    <div className="card bg-[#f5f5f5] max-w-66 min-h-80 shadow-sm relative my-2">
      {user?.role==='admin' ?<span onClick={handleUpdateProduct} className="badge absolute bg-error top-2 right-2 z-2 cursor-pointer">edit</span> :''}

      <figure className="px-5 pt-5">
        <img
          src={image}
          alt={name}
         className="h-40 rounded-xl transition-transform duration-300 hover:scale-105"
 />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-black line-clamp-1 cursor-pointer hover:text-gray-700" onClick={handleGetProductById}>{name}</h2>
         <p className="text-lg font-medium text-error">₹ {price}.00</p>
        <p className="text-black line-clamp-1">{description}</p>
        {/* <div className="card-actions">
          <button onClick={handleBuy} className="btn btn-primary">Buy Now</button>
          <button onClick={handleAddToCart} className="btn btn-outline btn-secondary">Add to Cart</button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
