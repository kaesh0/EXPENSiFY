import {fetchCurrentUser} from "../services/userService";
import{useState,useEffect} from 'react';
import {Navigate} from "react-router-dom"
export default function ProtectedRoute({children}){
    const[loading,setLoading]=useState(true);
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    useEffect(()=>{
        async function checkAuthentication() {
            try{
                await fetchCurrentUser();
                setIsAuthenticated(true);
            }
            catch(err){
                setIsAuthenticated(false);
            }
            finally{
                setLoading(false);
            }
        }
        checkAuthentication();
    },[]);
    if(loading){
        return <h1>CHECKING AUTHENTICATION...</h1>
    }
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    return children
}
