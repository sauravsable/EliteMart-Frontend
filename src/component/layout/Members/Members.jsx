import React, { useState, useEffect } from "react";
import "./Members.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cartInvitation,
  getCartDetails,
  removeCartMember,
  clearErrors,
} from "../../../actions/cartActions";
import {
  CART_INVITATION_RESET,
  REMOVE_CART_MEMBER_RESET,
} from "../../../constants/cartConstants";
import ClipLoader from "react-spinners/ClipLoader";
import { useAlert } from "react-alert";
import profileImage from "../../../images/Profile.png";
import { MdDeleteOutline } from "react-icons/md";

export default function Members({ id }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [searchQuery, setSearchQuery] = useState("");
  const [loadingUserId, setLoadingUserId] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { cartDetails } = useSelector((state) => state.newcart);
  const { users } = useSelector((state) => state.allUsers);
  const { error, isInvited, isRemoved } = useSelector((state) => state.invitation);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isInvited === true) {
      alert.success("Invitation Sent Successfully");
      dispatch({ type: CART_INVITATION_RESET });
      dispatch(getCartDetails(id));
      setLoadingUserId(null); // Reset loading state after success
    }

    if (isRemoved === true) {
      alert.success("Member Removed Successfully");
      dispatch({ type: REMOVE_CART_MEMBER_RESET });
      dispatch(getCartDetails(id));
    }
  }, [dispatch, error, isInvited, isRemoved, alert, id]);

  const handleItemClick = (e, user) => {
    e.preventDefault();
    setLoadingUserId(user._id); // Set the loading state for the clicked button

    const formData = new FormData();
    formData.set("userEmail", user.email);
    formData.set("userId", user._id);
    formData.set("cartId", id);

    dispatch(cartInvitation({ cartId: id, userId: user._id, userEmail: user.email }));

    setTimeout(() => {
      dispatch(getCartDetails(id));
    }, 500);
  };

  const removeMember = (e, member) => {
    e.preventDefault();
    dispatch(removeCartMember({ cartId: id, userId: member._id }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="adduserdiv">
      <h2 className="homeheading" style={{ textTransform: "capitalize" }}>
        Add Member
      </h2>
      <div className="dropdown">
        <input
          type="text"
          className="search-input"
          placeholder="Search User"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <div className="dropdown-content">
            {filteredUsers.length > 0 ? (
              filteredUsers
                .filter((filteredUser) => filteredUser._id !== user?._id)
                .map((filteredUser) => (
                  <div key={filteredUser._id} className="dropdown-item">
                    <p style={{ margin: "0" }}>{filteredUser.name}</p>
                    <button
                      className="requestbutton"
                      onClick={(e) => handleItemClick(e, filteredUser)}
                      disabled={loadingUserId === filteredUser._id} // Disable the button when loading
                    >
                      {loadingUserId === filteredUser._id ? (
                        <ClipLoader size={20} color={"#fff"} />
                      ) : (
                        "Send Request"
                      )}
                    </button>
                  </div>
                ))
            ) : (
              <div className="dropdown-item">
                <p style={{ margin: "0" }}>No users found</p>
              </div>
            )}
          </div>
        )}
      </div>
      {cartDetails && cartDetails.members && cartDetails.members.length > 0 ? (
        cartDetails.members
          .filter((mem) => mem.user._id !== user?._id)
          .map((member, index) => (
            <div className="userDetaildiv" key={index}>
              {member?.user?.avatar?.url ? (
                <img
                  className="userDetailImage"
                  src={member.user.avatar.url}
                  alt={`${member.user.name}'s avatar`}
                />
              ) : (
                <img
                  className="userDetailImage"
                  src={profileImage}
                  alt="user avatar"
                />
              )}
              <div>{member.user.name}</div>
              <div style={{ textTransform: "capitalize" }}>
                {member.status === "canceled" ? (
                  <>
                    <span style={{ paddingRight: "10px", margin: "0" }}>
                      {member.status}
                    </span>
                    <MdDeleteOutline
                      onClick={(e) => removeMember(e, member?.user)}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                ) : member.status === "pending" ? (
                  <span>{member.status}</span>
                ) : member.status === "accepted" ? (
                  <MdDeleteOutline
                    onClick={(e) => removeMember(e, member?.user)}
                    style={{ cursor: "pointer" }}
                  />
                ) : null}
              </div>
            </div>
          ))
      ) : (
        <div>No members found</div>
      )}
    </div>
  );
}
