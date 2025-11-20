import axios from 'axios';
import { persistor } from '../redux/store.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../redux/authSlice.js';
import { removeProducts } from '../redux/productSlice.js';
import { userOrders } from '../services/getProductsbyId.js';
import { addCartProducts, delCartProducts } from '../redux/cartSlice.js';
import { delProduct } from '../redux/singleProduct.js';

const NavComponent = () => {
    const user = useSelector(state => state.auth.user);
    const {cartProduct} = useSelector(state => state.cart);
    const cartProducts=cartProduct?.map(item=>item?.orderItems)
  const cartArr=cartProducts?.map(item=>item[0])
  const total=cartArr.reduce((acc,val)=>acc+val.price,0)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(user)
    const handleToCart=()=>{
        userOrders().then(res=>dispatch(addCartProducts(res)))
        navigate('/cart')
    }
    const handleLogout = () => {
        // Clear user session or token here
        axios.post("https://mern-shopin.onrender.com/api/users/logout", {}, { withCredentials: true }).then(() => {
            // Clear user session or token here
            localStorage.removeItem("token");
            dispatch(logout());
            dispatch(removeProducts());
            dispatch(delProduct());
            dispatch(delCartProducts());
            persistor.purge();
            alert('Logged out successfully!');
            navigate("/login");
        }).catch((error) => {
            console.error("Logout failed:", error);
        });
    }
    return (
        <div className="navbar sticky top-0 z-10 bg-base-100 shadow-sm">
            <div className="dropdown lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {user?.role==='admin' ?<li><Link to="/create-products">Create Products</Link></li> :''}
                </ul>
            </div>
            <div className="flex-1 lg:flex-none">
                <Link to='/' className="btn text-xl border border-white">ShopIN</Link>
            </div>
            {/* center */}
            <div className="flex-1 hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {user?.role==='admin' ?<li><Link to="/create-products">Create Products</Link></li> :''}

                </ul>
            </div>
            <div className={`${user ? "block" : 'hidden'} flex-none`}>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                            <span className="badge badge-sm indicator-item">{cartProduct?.length}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{cartProduct?.length} Items</span>
                            <span className="text-info">Subtotal: ${total}</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block" onClick={handleToCart}>View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={`${user?.avatar?.url || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}`}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
            {!user &&
                <div className="flex-none">
                    <Link to='/login' className="btn btn-sm text-xs p-1 border border-white">Log In</Link>
                </div>
            }
        </div>
    )
}

export default NavComponent