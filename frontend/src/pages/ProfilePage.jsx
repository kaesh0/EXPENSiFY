import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "../hooks";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const updateProfileSchema = z.object({
  name: z.string().min(1, "Name should not be empty"),
});
const initialValues = { name: "" };
function ProfilePage() {
  const { currUser, logout, authLoading } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    setFocus,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialValues,
  });
  const updateProfileMutation = useUpdateProfile();
  useEffect(() => {
    if (currUser) {
      reset({
        name: currUser.name,
      });
    }
  }, [reset, currUser]);
  useEffect(() => {
    if (isEditing) {
      setFocus("name");
    }
  }, [isEditing, setFocus]);

  async function handleEditSubmit(formValues) {
    try {
      await updateProfileMutation.mutateAsync({ name: formValues.name });
      setIsEditing(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  function handleCancelEdit() {
    reset({
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
  if (!currUser) {
    return <h2>No user found</h2>;
  }
  return (
    <main className="app-page profile-page">
      <form
        className="profile-form-card"
        onSubmit={handleSubmit(handleEditSubmit)}
      >
        <h1 className="font-bold text-2xl mb-2">Profile</h1>
        <p className="text-gray-500 mb-8">Manage your Account Information</p>
        <hr className="mb-6" />
        <div className="block p-6">
          <label className="text-md font-semibold mb-2 mr-2" htmlFor="name">
            NAME
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            disabled={!isEditing}
          />
        </div>
        {errors.name && <p className="profile-error">{errors.name.message}</p>}
        <div className="block p-6">
          <label className="text-md font-semibold mb-2 mr-2" htmlFor="email">
            Email
          </label>
          <p id="email" className="inline-block">
            {currUser.email}
          </p>
        </div>
        <hr className="mb-6" />
        <div className="p-8  flex gap-3">
          {isEditing && (
            <button
              className="rounded-md px-3 py-2 bg-gray-500 mr-2 hover:bg-gray-600 transition-colors duration-200"
              type="submit"
            >
              {updateProfileMutation.isPending? "SAVING...":"SAVE CHANGES"}
            </button>
          )}
          {!isEditing && (
            <button
              className="rounded-md px-3 py-2 bg-gray-500 mr-2 hover:bg-gray-600 transition-colors duration-200"
              type="button"
              onClick={()=>{setIsEditing(true)}}
            >
              EDIT PROFILE
            </button>
          )}
          {isEditing && (
            <button
              className="rounded-md px-3 py-2 bg-red-500 mr-2 hover:bg-red-700 transition-colors duration-200"
              type="button"
              onClick={handleCancelEdit}
            >
              CANCEL
            </button>
          )}
          {!isEditing && (
            <button
              className="rounded-md px-3 py-2 bg-blue-500 mr-2 hover:bg-blue-700 transition-colors duration-200"
              type="button"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
export default ProfilePage;
