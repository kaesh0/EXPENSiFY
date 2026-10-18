import { createContext} from "react";
import {useCurrentUser,useLogin,useLogout,useSignUp} from '../hooks/index'
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const loginMutation=useLogin();
  const logoutMutation=useLogout();
  const signUpMutation=useSignUp();
  const currentUserData=useCurrentUser();
  const currUser=currentUserData.data?? null;
  const authLoading=currentUserData.isPending;
  function login(credentials) {
    return loginMutation.mutateAsync(credentials);
  }
  function signUp(formdata){
    return signUpMutation.mutateAsync(formdata);
  }
  function logout() {
    return logoutMutation.mutateAsync();
  }
  return (
    <AuthContext.Provider
      value={{ currUser,authLoading, login, logout,signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
