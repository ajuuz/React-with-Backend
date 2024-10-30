import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AdminEditComponent from "../../Components/AdminEditComponent/AdminEditComponent";
import EditImage from "../../Components/EditProfilePopup/EditImage";
import "./UserViewPage.css";
const UserViewPage = () => {
  const [user, setUser] = useState({});
  const [editbox,setEditBox] = useState(false);
  const [imagePopup,setImagePopup]=useState(false);
  const imagePopupRef=useRef();

  const location = useLocation();
  const [UpdateMsg,setUpdateMsg] = useState(null)

  useEffect(()=>{
    const timer =setTimeout(()=>{
      setUpdateMsg(null);
      navigate(location.pathname,{replace:true})
    },3000)
    return ()=> clearTimeout(timer)
  },[UpdateMsg])

  // to close the popup of image edit
  function closeImagePopup(e) {
    if (!imagePopupRef.current.contains(e.target)) {
      setImagePopup(false);
    }
  }
  useEffect(() => {
    setUpdateMsg(location.state)
    if (imagePopup) {
      document.addEventListener("mousedown", closeImagePopup);
    } else {
      document.removeEventListener("mousedown", closeImagePopup);
    }

    return () => document.removeEventListener("mousedown", closeImagePopup);
  }, [imagePopup]);


  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setUpdateMsg(location.state)
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
  }, [editbox,imagePopup]);

 
  return (
    <div className={`${editbox?"flex justify-around":"block"}`}>
      {UpdateMsg ? (
            <div className="bg-black text-white inline-block absolute left-[50%] bottom-3 translate-x-[-50%] py-5 px-36">
              {UpdateMsg}
            </div>
          ) : null}
      {imagePopup && (
            <EditImage
              imagePopupRef={imagePopupRef}
              currentUser={user}
              closeImagePopup={setImagePopup}
              role='admin'
            />
          )}
      <div className={`${editbox?"mx-0 user-detail":"user-detail"}`}>
        <img
        onDoubleClick={()=>setImagePopup(true)}
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
        <AdminEditComponent userDetails={user} closeEditBox={setEditBox}/>
      </div>
    </div>
  );
};

export default UserViewPage;
