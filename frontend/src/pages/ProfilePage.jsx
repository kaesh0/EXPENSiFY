import { useState,useEffect, useContext,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
function ProfilePage() {
  const { currUser, updateCurrUser, logout,authLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const nameInputRef=useRef(null);
  useEffect(()=>{
    if(isEditing){
      nameInputRef.current.focus();
    }
  },[isEditing])
  async function handleEditSubmit(e) {
    e.preventDefault();
    if (!isEditing) {
      setFormData({
        name: currUser.name,
      });
      setIsEditing((prev) => !prev);
      return;
    }
    try {
      const updatedUser = await updateProfile(formData.name);

      updateCurrUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error(err.message);
    }
    return;
  }
  function handleEditProfile(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    return;
  }
  function handleCancelEdit() {
    setFormData({
      name: currUser.name,
    });
    setIsEditing(false);
  }
  async function handleLogout() {
    try {
      await logout();
      console.log("logout success");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err.message);
    }
  }
  if (authLoading) {
    return <h2>PROFILE LOADING ,HOLD TIGHT........</h2>;
  }
  if(!currUser){
    return <h2>No user found</h2>
  }
  return (
    <main className="max-w-5xl mx-auto p-8">
        <form className="bg-white  shadow-xl rounded-xl max-w-xl w-full mx-auto p-8" onSubmit={handleEditSubmit}>
          <h1 className="font-bold text-2xl mb-2">Profile</h1>
          <p className="text-gray-500 mb-8">Manage your Account Information</p>
          <hr className="mb-6"/>
          <div className="block p-6">
            <label className="text-md font-semibold mb-2 mr-2" htmlFor="name">NAME</label>
            <input
              id="name"
              type="text"
              name="name"
              ref={nameInputRef}
              value={!isEditing ? currUser.name : formData.name}
              disabled={!isEditing}
              onChange={handleEditProfile}
            />
          </div>
          <div className="block p-6">
            <label className="text-md font-semibold mb-2 mr-2"  htmlFor="email">Email</label>
            <p id="email" className="inline-block">{currUser.email}</p>
          </div>
          <hr className="mb-6"/>
          <div className="p-8  flex gap-3">
            <button className="rounded-md px-3 py-2 bg-gray-500 mr-2 hover:bg-gray-600 transition-colors duration-200" type="submit">
              {!isEditing ? "EDIT PROFILE" : "SAVE CHANGES"}
            </button>
            {isEditing && (
              <button className="rounded-md px-3 py-2 bg-red-500 mr-2 hover:bg-red-700 transition-colors duration-200" type="button" onClick={handleCancelEdit}>
                CANCEL
              </button>
            )}
            {!isEditing && (<button  className="rounded-md px-3 py-2 bg-blue-500 mr-2 hover:bg-blue-700 transition-colors duration-200" type="button" onClick={handleLogout}>
              LOGOUT
            </button>)}
          </div>
        </form>
      </main>
  );
}
export default ProfilePage;
