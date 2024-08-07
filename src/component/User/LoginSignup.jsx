import React,{useRef,useState,useEffect} from 'react'
import './loginsignup.css';
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import './loginsignup.css';

import { useSelector,useDispatch } from 'react-redux';
import {login,clearErrors,register} from '../../actions/userActions';

import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function LoginSignup({location}) {
    const dispatch = useDispatch();
    const alert  = useAlert();
    const navigate = useNavigate();
    const {shipping} = useParams();

    const {error,loading,isAuthenticated} = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
        // navigate("/account")
    };

    const registerSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name",name);
        formData.set("email",email);
        formData.set("password",password);
        dispatch(register(formData));

      };

      const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


      useEffect(()=>{
        if(error){
          alert.error(error);
          dispatch(clearErrors())
        }

        if(isAuthenticated){
          console.log("isAuthenticate in login",isAuthenticated);
          navigate("/account")  
        }
      },[alert,dispatch,error,isAuthenticated,navigate,shipping]);



    const switchTabs = (e,tab)=>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
  return (
  <>
  {
    loading ? 
    <Loader/>
    :
    <>
    <div className="LoginSignUpContainer">
    <div className="LoginSignUpBox">
        <div>
            <div className="login_signUp_toggle">
                <p className='mb-0' onClick={(e)=>{switchTabs(e,"login")}}>LOGIN</p>
                <p className='mb-0'  onClick={(e)=>{switchTabs(e,"register")}}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
        </div>

        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
                <MailOutlineIcon/>
                <input 
                type="email"
                placeholder='Email'
                required
                value={loginEmail}
                onChange={(e)=>{setLoginEmail(e.target.value)}}
                 />
            </div>
            <div className="loginPassword">
                <LockOpenIcon/>
                <input 
                type="password"
                placeholder='password'
                required
                value={loginPassword}
                onChange={(e)=>{setLoginPassword(e.target.value)}}
                 />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className='loginBtn' />
        </form>

        <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <input type="submit" value="Register" className="signUpBtn" />
              </form>
    </div>
  </div>
    </>
  }
  </>
  )
}
