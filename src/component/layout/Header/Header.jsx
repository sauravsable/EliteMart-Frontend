import { useEffect,useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "../UserOptions/UserOptions";
import Search from "../../Search/Search";
import CartOptions from "../CartOptions/CartOptions";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector(state => state.cart);

  const [open, setOpen] = useState(false);

    const toggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 992) {
        if (window.scrollY > 45) {
          document
            .querySelector(".fixed-top")
            .classList.add("bg-white", "shadow");
        } else {
          document
            .querySelector(".fixed-top")
            .classList.remove("bg-white", "shadow");
        }
      } else {
        if (window.scrollY > 45) {
          document
            .querySelector(".fixed-top")
            .classList.add("bg-white", "shadow");
          document.querySelector(".fixed-top").style.top = "-45px";
        } else {
          document
            .querySelector(".fixed-top")
            .classList.remove("bg-white", "shadow");
          document.querySelector(".fixed-top").style.top = "0";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid fixed-top px-0" data-wow-delay="0.1s">
      <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
        <div className="col-lg-4 px-5 text-start">
          <p className="mb-0">
            Let's talk! <strong>+57 444 11 00 35</strong>
          </p>
        </div>
        <div className="col-lg-4 px-5 text-center">
          <p className="mb-0">Free shipping on a purchase value of $200</p>
        </div>
        <div className="col-lg-4 d-flex justify-content-end align-items-center px-5 text-end">
          {isAuthenticated && isAuthenticated === true ? (
            <UserOptions user={user} />
          ) : (
            <Link className="ms-3" to="/login" style={{color:"white"}}>
              {/* <FaRegUser /> */}
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="navbarcontainer">
        <div className="col-xl-6 col-4">
          {/* <img className='logoimg' src={logo} alt="logo" /> */}
          <Link to="/" className="logoimg">EliteMart</Link>
        </div>

        <div className="nav-elements d-flex col-xl-6 col-8">
          <Search />
          <div className="carticondiv carticondiv1">
            {
              isAuthenticated && isAuthenticated === true ?(
                <button className="cartlink text-body ms-3" style={{border:"none"}} onClick={toggleDropdown}>
                <MdOutlineShoppingCart /><span>{cartItems.length}</span>
              </button>
              ):
              (
                <Link to="/cart" className="cartlink text-body ms-3">
                <MdOutlineShoppingCart /><span>{cartItems.length}</span>
              </Link>
              )
            }
            {isAuthenticated && isAuthenticated === true &&
             <CartOptions user={user} open={open} setOpen={setOpen}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
