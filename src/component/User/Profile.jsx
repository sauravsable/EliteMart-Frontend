import React, { Fragment, useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./profile.css";
import MetaData from "../layout/MetaData/MetaData";
import { useNavigate } from "react-router-dom";
import SetAvatar from "../layout/SetAvatar/SetAvatar";
import profileImage from '../../images/Profile.png';

const Profile = () => {
  const [show,setShow] = useState(false);
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user?.avatar?.url ? user?.avatar?.url : profileImage} alt={user.name} />
              <SetAvatar show={show} setShow={setShow}/>
              <button className="profilechangebtn" onClick={() => setShow(true)}>Edit Profile Picture</button>
              <Link to="/me/update">Edit Profile</Link>
              
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
                <Link to="/create/Cart">Create Cart</Link>

              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;