import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";
function Navbar() {
  const { currUser, loading } = useContext(AuthContext);
  if (loading) {
    return <p>LOADING THE NAVBAR</p>;
  }
  return (
    <nav className="navbar">
      <h2>EXPENSE FLOW</h2>
      <div className="nav-links">
        <Link to="/">HOME</Link>
        {currUser ? (
          <>
            <Link to="/expenses"> YOUR EXPENSES</Link>
            <Link to="/dashboard"> DASHBOARD</Link>
            <Link to="/profile">PROFILE</Link>
          </>
        ) : (
          <>
            <Link to="/signup">SIGN UP</Link>
            <Link to="/login">LOGIN</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
