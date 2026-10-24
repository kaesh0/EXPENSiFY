import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { currUser, loading } = useContext(AuthContext);
  const getNavClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  if (loading) return <p>LOADING THE NAVBAR</p>;

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink className="brand" to="/" aria-label="Expens!fy home">
          <img className="brand-logo" src="/expensify-logo.png" alt="Expens!fy — Personal Expense & Cash Flow" />
        </NavLink>
        <div className="nav-links">
          <NavLink className={getNavClass} to="/">Home</NavLink>
          {currUser ? (
            <>
              <NavLink className={getNavClass} to="/expenses">Your expenses</NavLink>
              <NavLink className={getNavClass} to="/dashboard">Dashboard</NavLink>
              <NavLink className={getNavClass} to="/profile">Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink className={getNavClass} to="/signup">Sign up</NavLink>
              <NavLink className="nav-cta" to="/login">Log in</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
