import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
function ProfilePage() {
  const { currUser, updateCurrUser, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
  if (loading) {
    return <h2>PROFILE LOADING ,HOLD TIGHT........</h2>;
  }
  return (
    <form onSubmit={handleEditSubmit}>
      <label htmlFor="name">NAME</label>
      <input
        id="name"
        type="text"
        name="name"
        value={!isEditing ? currUser.name : formData.name}
        disabled={!isEditing}
        onChange={handleEditProfile}
      />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" value={currUser.email} disabled />
      <button type="submit">
        {!isEditing ? "EDIT PROFILE" : "SAVE CHANGES"}
      </button>
      {isEditing && (
        <button type="button" onClick={handleCancelEdit}>
          CANCEL
        </button>
      )}
      <button type="button" onClick={handleLogout}>
        LOGOUT
      </button>
    </form>
  );
}
export default ProfilePage;
