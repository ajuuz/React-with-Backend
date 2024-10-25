import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../../../Components/Header/Header";
import EditProfilePopup from "../../../Components/EditProfilePopup/EditProfilePopup";
import { useSelector } from "react-redux";
import "./UserProfile.css";
import EditPassword from "../../../Components/EditProfilePopup/EditPassword";
import { useLocation, useNavigate } from "react-router-dom";
import EditImage from "../../../Components/EditProfilePopup/EditImage";
const UserProfile = () => {
  const [userProfileDetails, setUserProfileDetails] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const [fieldToChange, setFieldToChange] = useState(null);
  const [isPasswordPopup, setIsPasswordPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);

  const location = useLocation();
  const [updateSuccess, setUpdateSucces] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdateSucces(null);
      navigate(location.pathname, { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [updateSuccess]);

  // reference for the editting popup this is gonna pass to the editProfileComponent created to close
  const popupRef = useRef();

  // referencing the password popup  component created to close
  const pwdPopupRef = useRef();

  // referencing image uploading input . gonna pass to the image component. created to close
  const imagePopupRef = useRef();

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const res = await fetch(`/api/user/getuser/${currentUser._id}`);
        const data = await res.json();

        setUserProfileDetails(data);
      } catch (error) {
        console.log("error in profile page", error);
      }
    }
    fetchProfileData();
  }, [fieldToChange, imagePopup]);

  // to close the popup of image edit
  function closeImagePopup(e) {
    if (!imagePopupRef.current.contains(e.target)) {
      setImagePopup(false);
    }
  }
  useEffect(() => {
    setUpdateSucces(location.state);
    if (imagePopup) {
      document.addEventListener("mousedown", closeImagePopup);
    } else {
      document.removeEventListener("mousedown", closeImagePopup);
    }

    return () => document.removeEventListener("mousedown", closeImagePopup);
  }, [imagePopup]);

  // to close the popup if click outside
  function closePopup(e) {
    if (!popupRef.current.contains(e.target)) {
      setFieldToChange(null);
    }
  }
  useEffect(() => {
    setUpdateSucces(location.state || null);
    if (fieldToChange) {
      document.addEventListener("mousedown", closePopup);
    } else {
      document.removeEventListener("mousedown", closePopup);
    }
    return () => document.removeEventListener("mousedown", closePopup);
  }, [fieldToChange]);
  // to close the popup if click outside

  function closePasswordPopup(e) {
    if (!pwdPopupRef.current.contains(e.target)) {
      console.log(pwdPopupRef.current);
      setIsPasswordPopup(null);
    }
  }
  useEffect(() => {
    setUpdateSucces(location.state || null);
    if (isPasswordPopup) {
      document.addEventListener("mousedown", closePasswordPopup);
    } else {
      document.removeEventListener("mousedown", closePasswordPopup);
    }
    return () => document.removeEventListener("mousedown", closePasswordPopup);
  }, [isPasswordPopup]);

  function handleDoubleClickPop(e, key, value) {
    setFieldToChange({ key, value });
    console.log(userProfileDetails.imagePath);
  }

  // image functions

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="mt-20 userProfile-outerDiv border inline-block px-20 pt-5 pb-20 shadow-2xl">
          <h1 className="text-center mb-5 font-mono text-3xl font-bold">PROFILE</h1>
          {updateSuccess ? (
            <div className="bg-black text-white inline-block absolute left-[50%] bottom-3 translate-x-[-50%] py-5 px-36">
              {updateSuccess}
            </div>
          ) : null}
          {fieldToChange ? (
            <EditProfilePopup
              popupType={fieldToChange}
              popupRef={popupRef}
              currentUser={currentUser}
              popupping={setFieldToChange}
            />
          ) : (
            ""
          )}
          {isPasswordPopup && (
            <EditPassword
              pwdPopupRef={pwdPopupRef}
              currentUser={currentUser}
              closePasswordPopup={setIsPasswordPopup}
            />
          )}

          {imagePopup && (
            <EditImage
              imagePopupRef={imagePopupRef}
              currentUser={currentUser}
              closeImagePopup={setImagePopup}
            />
          )}

          <img
            className="mx-auto w-52 h-52 profile-image cursor-pointer"
            onDoubleClick={() => setImagePopup(true)}
            src={
              userProfileDetails?.imagePath
                ? `http://localhost:3000/uploads/${userProfileDetails.imagePath}`
                : `https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1297763733.1729555200&semt=ais_hybrid`
            }
            alt="profile pic"
          />
          <div className="text-center p-1">
            <span
              onDoubleClick={(e) =>
                handleDoubleClickPop(e, "name", userProfileDetails.name)
              }
              className="font-serif font-bold text-3xl cursor-pointer"
            >
              {userProfileDetails?.name}
            </span>
          </div>
          <div className="text-center p-1">
            <span
              onDoubleClick={(e) =>
                handleDoubleClickPop(e, "username", userProfileDetails.username)
              }
              className="text-center font-mono p-3 cursor-pointer"
            >
              Username: {userProfileDetails?.username}
            </span>
          </div>
          <div className="text-center p-1">
            <span
              onDoubleClick={(e) =>
                handleDoubleClickPop(e, "email", userProfileDetails?.email)
              }
              className="text-center font-mono p-3 cursor-pointer"
            >
              Email: {userProfileDetails?.email}
            </span>
          </div>
          <div className="text-center p-1">
            <span
              onDoubleClick={(e) =>
                handleDoubleClickPop(e, "phone", userProfileDetails?.phone)
              }
              className="text-center font-mono p-3 cursor-pointer"
            >
              Phone number: {userProfileDetails?.phone}
            </span>
          </div>
          <div className="text-center">
          <button
            onClick={() => setIsPasswordPopup(true)}
            className="py-2 px-8 bg-blue-300 text-white font-mono hover:bg-blue-600 rounded-lg mt-8"
          >
            Edit Password
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
