import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Navbar() {
  const { currUser, loading } = useContext(AuthContext);
  function getNavClass({isActive}){
    return `px-3 py-2 rounded-md transition-colors duration-200 ${isActive? "text-blue-600 font-semibold":"text-gray-600 hover:bg-gray-200"}`;
  }
  if (loading) {
    return <p>LOADING THE NAVBAR</p>;
  }
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-blue-600">EXPENS!FY</h2>
      <div className="flex gap-6">
        <NavLink className={getNavClass} to="/">HOME</NavLink>
        {currUser ? (
          <>
            <NavLink className={getNavClass}  to="/expenses"> YOUR EXPENSES</NavLink>
            <NavLink className={getNavClass} to="/dashboard"> DASHBOARD</NavLink>
            <NavLink className={getNavClass}  to="/profile">PROFILE</NavLink>
          </>
        ) : (
          <>
            <NavLink className={getNavClass}  to="/signup">SIGN UP</NavLink>
            <NavLink className={getNavClass}  to="/login">LOGIN</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
