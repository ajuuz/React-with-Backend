import React, { useEffect, useState } from "react";
import { AdminLogout } from "../../../redux/Admin/adminSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../../../redux/user/userSlice";
import AdminAddUser from "../../../Components/AdminAddUserComponent/AdminAddUser";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [clickToChoose,setClickToChoose]=useState(null);
  const [addUserComponent,setAddUserComponent] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [addedMessage,setAddedMessage]=useState()

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
}, [clickToChoose,addUserComponent]);


useEffect(()=>{
    setAddedMessage(location.state)
   const timer =  setTimeout(()=>{
        setAddedMessage(null);
        navigate(location.pathname,{replace:true})
    },3000)
    return ()=> clearTimeout(timer);
},[addUserComponent])

const handleViewUser=(id)=>{
    navigate(`/admin/viewuser/${id}`)
}
const handleClose=(e)=>{
    console.log("clicked")
    e.stopPropagation();
    setClickToChoose(null)
}
const handleDelete=async(e,id)=>{
    console.log(id)
    const confirmDeletion = window.confirm("ARE you sure?")
    if(!confirmDeletion) return;
    try{
        const res = await fetch(`/api/admin/delete/${id}`);
        const data = res.json();
        console.log(data);
        setClickToChoose(false)
        dispatch(userLogout())
    }
    catch(error){
        console.log("error at deleting by admin")
    }
  }
  return (
    <div>
      <header className="p-5 bg-slate-300 flex justify-between font-mono font-bold">
        <div>ADMIN DASHBOARD</div>
        <div>
          <button onClick={handleAdminLogout}>Logout</button>
        </div>
      </header>
      <div className="flex flex-wrap justify-center">
      {addedMessage
      ?<div className="bg-black text-white inline-block absolute left-[50%] bottom-3 translate-x-[-50%] py-5 px-36 z-10">{addedMessage}</div>
      :null}
        {addUserComponent && <AdminAddUser setAddUserComponent={setAddUserComponent}/>}
        {allUsers.map((user,index) => (
          <div className="card relative" onClick={()=>setClickToChoose(index)}>
            {clickToChoose===index 
            ?  <div className="absolute bg-black opacity-60 w-[100%] h-[100%] flex items-center justify-center gap-5 text-white ">
                <button onClick={()=>handleViewUser(user._id)} className="px-5 border border-white h-[10%] font-mono font-bold hover:text-black hover:bg-white transition-all duration-200">view</button>
                <button onClick={(e)=>handleDelete(e,user._id)} className="px-5 border border-white h-[10%] font-mono font-bold hover:text-black hover:bg-white transition-all duration-200">delete</button>
                <button onClick={handleClose} className="px-5 border border-white h-[10%] font-mono font-bold hover:text-black hover:bg-white transition-all duration-200">x</button>
                </div>
                :null
                }
           
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
      <div className="text-center">
      <button onClick={()=>setAddUserComponent(true)} className="py-1 px-3 rounded-lg bg-green-400 text-white">ADD A USER</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
