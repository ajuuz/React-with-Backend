import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors,setFieldErrors] = useState({})

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0]);
  };

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


  const validateForm = () => {
    let formErrors = {};

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is not valid";
    }

    if (!formData.name) {
      formErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{3,20}$/.test(formData.name)) {
      formErrors.name = "Name must contain only letters and at least 2 characters.";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
    }
    if(!formData.username){
      formErrors.username = "username is required"
    }
    if (!formData.phone) {
      formErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Phone number must be 10 digits.";
    }

    

    return formErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setError(false);
    const validation = validateForm();
    if(Object.keys(validation).length>0) {
      
      console.log(validation)
      setFieldErrors(validation)
      return
    }
    setLoading(true);
    try {
      if (image) {
        const imageUploadResult = await uploadImage();
        if (!imageUploadResult.success) {
          console.log(imageUploadResult.error);
          setError(imageUploadResult.error);
          return;
        }
        console.log(imageUploadResult.imagePath);

        const res = await fetch("/api/user/signup", {
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
        navigate("/user/signin",{state:data.message});
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter your Name"
            id="name"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          {fieldErrors.name && <p className="text-red-700">{fieldErrors.name}</p>}
          <input
            type="text"
            placeholder="Enter your Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          {fieldErrors.email && <p className="text-red-700">{fieldErrors.email}</p>}
          <input
            type="number"
            placeholder="Enter your Phone number"
            id="phone"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
           {fieldErrors.phone && <p className="text-red-700">{fieldErrors.phone}</p>}
          <input
            type="text"
            placeholder="Enter a username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          {fieldErrors.username && <p className="text-red-700">{fieldErrors.username}</p>}
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
       {fieldErrors.password && <p className="text-red-700">{fieldErrors.password}</p>}
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg uppercase hover:bg-opacity-95 p-3 disabled:bg-opacity-80"
          >
            {loading ? "loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an Account ?</p>
          <Link to="/user/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
        <p className="text-red-500 font-bold mt-3 text-center">
          {error ? error : ""}
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
