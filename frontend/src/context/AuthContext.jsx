import { createContext, useState, useEffect } from "react";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  signUpUser
} from "../services/userService";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  async function login(credentials) {
    await loginUser(credentials);
    const user=await fetchCurrentUser();
    setCurrUser(user);
  }
  async function signUp(formdata){
    const data=await signUpUser(formdata);
    setCurrUser(data.user)
    return data;
  }
  function updateCurrUser(updatedUser) {
    setCurrUser(updatedUser);
  }
  async function logout() {
    console.log("logut clicked");

    await logoutUser();
    console.log("logout success");
    setCurrUser(null);
  }
  useEffect(() => {
    async function getCurrUser() {
      try {
        const user = await fetchCurrentUser();
        setCurrUser(user);
      } catch (err) {
        console.error(err.message);
      } finally {
        setAuthLoading(false);
      }
    }
    getCurrUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ currUser, updateCurrUser, authLoading, login, logout,signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
