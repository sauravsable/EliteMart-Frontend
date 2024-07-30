import React, { useEffect } from "react";
import './CartOptions.css'
import { TbShoppingCartShare } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartOptions = ({open, setOpen }) => {

  const {carts} = useSelector(state=> state.newcart);

  console.log("cart options",carts);

  const handleOutsideClick = (e) => {
    if (open && !e.target.closest(".carticondiv")) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  return (
    <div className="profile-dropdown">
      {open && (
        <ul className="profile-dropdown-list1">
            <li className="profile-dropdown-list-item1" style={{color:"white"}}>
                <Link to="/cart" onClick={() => { setOpen(false)}} style={{textTransform:"capitalize"}}>
                  <TbShoppingCartShare /> My Cart
                </Link>
            </li>
            {
            carts && carts.length > 0 && 
            carts.map((cart)=>(
                <li className="profile-dropdown-list-item1" style={{color:"white"}}>
                <Link to={`/cart/${cart._id}`} onClick={() => { setOpen(false)}} style={{textTransform:"capitalize"}}>
                  <TbShoppingCartShare /> {cart.cartName}
                </Link>
              </li>
            ))
            }
        </ul>
      )}
    </div>
  );
};

export default CartOptions;
