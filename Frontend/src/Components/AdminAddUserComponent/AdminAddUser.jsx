import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddUser = ({setAddUserComponent}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
  });
const [error,setError] = useState();
const [loading,setLoading] = useState();
const navigate = useNavigate()


  async function uploadImage() {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("/api/user/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data.message);
        return { success: true, imagePath: data.filePath };
      } else {
        console.error("Image upload failed:", data.error);
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return { success: false, error: "Image upload failed" };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    setError(false);
    try {
      if (image) {
        const imageUploadResult = await uploadImage();
        if (!imageUploadResult.success) {
          console.log(imageUploadResult.error);
          setError(imageUploadResult.error);
          return;
        }
        console.log(imageUploadResult.imagePath);

        const res = await fetch("/api/admin/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify({...formData,imagePath:imageUploadResult.imagePath}),
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }
        navigate("/admin/dashboard",{state:data.message});
        setAddUserComponent(false)
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };


  const [image,setImage]=useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleImageChange=(e)=>{
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }
 

  return (
    <div className="user-form fixed z-10">
      <div className="flex w-[60%] justify-between"><span onClick={()=>setAddUserComponent(false)} className="cursor-pointer font-bold text-xl">x</span><h1>User Details Form</h1></div>
      <form onSubmit={handleSubmit} className="flex gap-10">
        <div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button disabled={loading} type="submit" className="submit-button">
            {loading?"loading...":"Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddUser;
