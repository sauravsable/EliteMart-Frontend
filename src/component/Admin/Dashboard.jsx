import React, {useEffect} from "react";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData/MetaData.jsx";
import SideBar from "./SideBar.jsx";
import {useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productActions.js";
import { getAllOrders } from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {products} = useSelector(state => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <SideBar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹ {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Dashboard;
