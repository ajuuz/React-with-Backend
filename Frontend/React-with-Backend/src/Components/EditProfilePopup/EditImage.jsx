import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditImage = ({ imagePopupRef,currentUser,closeImagePopup,role }) => {
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  console.log(role)
    const navigate = useNavigate()
  const handleChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0])
  };

  async function uploadImage() {
    const formData = new FormData();
    formData.append("image", image);
    console.log("image upload 1")
    try {
      
      console.log("image upload 2")
      const res = await fetch(`/api/user/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        console.log(data.message);
        return { success: true, imagePath: data.filePath };
      } else {
        console.error("Image upload failed: ", data.error);
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.log("image upload error")
      console.error("Error uploading image: ", error);
      return { success: false, error: "Image upload failed" };
    }
  }
  const handleImageSubmit =async (e) => {
    e.preventDefault();
    if (!image) {
      setError("please upload a image");
      return;
    }
    try{
        const imageUploadResult = await uploadImage();
        
        const res = await fetch(`/api/${role}/editimage/${currentUser._id}`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({imagePath:imageUploadResult.imagePath})
        })
        const data = await res.json();
        navigate(role==="user"?'/user/profile':`/admin/viewuser/${currentUser._id}`,{state:data.message});
        closeImagePopup(false)
    }
    catch(error){
        console.log("error in edit image catch")
    }
    
  };
  return (
    <div
      ref={imagePopupRef}
      className="absolute w-[500px] left-[50%] translate-x-[-50%] p-5 bg-slate-400"
    >
      <form
        onSubmit={handleImageSubmit}
        className="flex flex-col gap-6 EditProfilePopup-form"
      >
        <p className="text-center text-white">Change ProfilePic</p>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleChange}
        />

        {error ? <p className="text-red-400 text-center">{error}</p> : ""}
        <button
          // disabled={loading}
          className="bg-slate-700 text-white rounded-lg uppercase hover:bg-opacity-95 p-3 disabled:bg-opacity-80"
        >
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditImage;
