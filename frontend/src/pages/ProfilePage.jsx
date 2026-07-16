import { useState, useEffect,} from "react";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const [currUser, setCurrUser] = useState({
    name: "",
    email: "",
  });
    const [formData, setFormData] = useState({
    name: "",
  });
  const[isEditing,setIsEditing]=useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function updateProfile(){
    try{
        const response=await fetch("http://localhost:3000/api/users/profile/",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            credentials:"include",
            body:JSON.stringify({
                name:formData.name
            })
        })
        const data=await response.json()
        if(!response.ok){
            console.log(data.message);
            return null;
        }
        return data;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
  }
  async function handleEditSubmit(e){
    e.preventDefault();
    if(!isEditing){
        setFormData({
            name:currUser.name,
        })
        setIsEditing(prev=>!prev);
        return;
    }
    const updatedUser=await updateProfile();
    if(!updatedUser){return};
    setCurrUser(updatedUser)
    setIsEditing(false);
    return;
  }
  function handleEditProfile(e){
    setFormData(prev=>({
        ...prev,
        [e.target.name]:e.target.value
    }))
    return;
  }
  function handleCancelEdit(){
    setFormData({
        name:currUser.name,
    })
    setIsEditing(false);
  }
  useEffect(() => {
    async function getCurrentUser() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include",
        });
        const userInfo = await response.json();
        if (!response.ok) {
          console.log(userInfo.message);
          navigate("/login", { replace: true });
          return;
        }
        setCurrUser({name: userInfo.name, email: userInfo.email });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getCurrentUser();
  },[]);
  if(loading){
    return <h2>PROFILE LOADING ,HOLD TIGHT........</h2>
  }
  return(
    <form onSubmit={handleEditSubmit}>
      <input type="text" name="name" value={!isEditing? currUser.name:formData.name} disabled={!isEditing} onChange={handleEditProfile}/>
      <input type="email"  name="email" value={currUser.email} disabled/>
      <button type="submit">{!isEditing?"EDIT PROFILE":"SAVE CHANGES"}</button>
      {isEditing && <button type="button" onClick={handleCancelEdit}>CANCEL</button>}
    </form>
  )
}
export default ProfilePage;
