import React,{useState,useEffect, useLayoutEffect} from 'react'
import './AdminEditComponent.css';
import { useNavigate } from 'react-router-dom';
const AdminEditComponent = ({userDetails,closeEditBox}) => {
    console.log(userDetails)
    const [UpdateMsg,setUpdateMsg]=useState(null);
    const [error,setError]= useState(null)
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        phone: "",
    });

    useEffect(()=>{
            setFormData({
                name:userDetails.name,
                email:userDetails.email,
                username:userDetails.email,
                phone:userDetails.phone,
            })
    },[userDetails])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try{
            const res = await fetch(`/api/admin/useredit/${userDetails._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            });
            const data = await res.json();
            if(data.success===false)
            {
             setError(data.message);
             setTimeout(()=>{
                setError(null)
             },3000)
             return;   
            }
            console.log(data.message);
            setUpdateMsg(data.message);
            navigate(`/admin/viewuser/${userDetails._id}`,{state:data.message})
            closeEditBox(false);
        }
        catch(error){
            console.log("update error when admin edits")
        }
    };

    return (
        <div className="user-form w-[500px] mt-24">
            <h1>User Details Form</h1>
            <form onSubmit={handleSubmit}>
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
                {error && <p className='text-red-500'>{error}</p>}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default AdminEditComponent;
