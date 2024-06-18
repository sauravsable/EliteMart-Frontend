import './MobileViewHeader.css';
import {Link} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
export default function MobileViewHeader() {
  const { cartItems } = useSelector(state => state.cart);

  return (
    <>
    <div className='mobileviewheaderdiv'>
      <div className="mobileviewheaderrow">

            <div className="newheaaderrow1column1">
             <Link to="/" style={{color:"black"}}> <FaHome style={{height:"35px",width:"100%",color:"white"}}/></Link>
            </div>

            <div className="newheaaderrow1column1">
            <Link to="/products"><MdOutlineProductionQuantityLimits style={{height:"35px",width:"100%",color:"white"}}/></Link>
            </div>

            <div className="newheaaderrow1column1">
            <div className="carticondiv">
            <Link className="cartlink text-body ms-3" to="/cart">
              <MdOutlineShoppingCart style={{height:"35px",width:"100%",color:"white"}}/><span>{cartItems.length}</span>
            </Link>
            </div>
            </div>

            <div className="newheaaderrow1column1">
            <Link style={{color:"white"}} to="/login"><MdOutlineAccountCircle style={{height:"35px",width:"100%",color:"white"}}/></Link>
            </div>
      </div>
    </div>
    </>
  )
}
