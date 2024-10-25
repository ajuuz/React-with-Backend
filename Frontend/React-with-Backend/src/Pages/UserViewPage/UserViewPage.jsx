import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminEditComponent from "../../Components/AdminEditComponent/AdminEditComponent";
import "./UserViewPage.css";
const UserViewPage = () => {
  const [user, setUser] = useState({});
  const [editbox,setEditBox] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const res = await fetch(`/api/admin/viewuser/${id}`);
        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log("error in viewPage of admin fetching single user");
      }
    };
    fetchSingleUser();
  }, []);

  return (
    <div className={`${editbox?"flex justify-around":"block"}`}>
      <div className={`${editbox?"mx-0 user-detail":"user-detail"}`}>
        <img
          src={
            user?.imagePath
              ? `http://localhost:3000/uploads/${user.imagePath}`
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="user-image"
        />
        <div className="user-info">
          <h1 className="user-name">{user?.name ? user.name : "name"}</h1>
          <p className="user-email">
            <strong>Email:</strong> {user?.email ? user.email : "email"}
          </p>
          <p className="user-address">
            <strong>Username:</strong>
            {user?.username ? user.username : "username"}
          </p>
          <p className="user-phone">
            <strong>Phone:</strong> {user?.phone ? user.phone : "phone"}
          </p>
          <p className="user-bio">
            <strong>
              Joined At:{user?.createdAt ? user.createdAt.slice(0, 4) : "2024"}
            </strong>{" "}
          </p>
        </div>
        <div className="button-container">
          <button className="btn go-back" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <button className="btn edit" onClick={()=>setEditBox(true)}>Edit</button>
        </div>
      </div>
      <div className={`${editbox?"block":"hidden"}`}>
        <AdminEditComponent/>
      </div>
    </div>
  );
};

export default UserViewPage;
