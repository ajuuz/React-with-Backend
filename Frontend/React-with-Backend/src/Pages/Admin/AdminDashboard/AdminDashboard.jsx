import React, { useEffect, useState } from "react";
import { AdminLogout } from "../../../redux/Admin/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogout = async () => {
    dispatch(AdminLogout());
    navigate("/admin/signin");
    try {
      const res = await fetch("/api/admin/logout");
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("error in admin logout");
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      const res = await fetch("/api/admin/getallusers");
      const data = await res.json();
      console.log(data.users);
      setAllUsers(data.users);
    };
    fetchUsersData();
  }, []);


  const handleViewUser=(id)=>{
    navigate(`/admin/viewuser/${id}`)
  }
  return (
    <div>
      <header className="p-5 bg-slate-300 flex justify-between font-mono font-bold">
        <div>ADMIN DASHBOARD</div>
        <div>
          <button onClick={handleAdminLogout}>Logout</button>
        </div>
      </header>
      <div className="flex flex-wrap">
        {allUsers.map((user) => (
          <div className="card" onClick={()=>handleViewUser(user._id)}>
            <img
              src={
                user?.imagePath
                  ? `http://localhost:3000/uploads/${user.imagePath}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-name">{user.name}</h2>
              <p className="card-email">{user.email}</p>
              <p className="card-phone">{user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
