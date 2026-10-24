import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { currUser, authLoading } = useContext(AuthContext);
  const getNavClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink className="brand" to="/" aria-label="Expens!fy home"><span className="brand-mark">E!</span><span>Expens!fy</span></NavLink>
        {!authLoading && (
          <div className="nav-links">
            <NavLink className={getNavClass} to="/">Features</NavLink>
            <a className="nav-link" href="#how-it-works">How it works</a>
            <a className="nav-link" href="#pricing">Pricing</a>
            {currUser ? <><NavLink className={getNavClass} to="/dashboard">Dashboard</NavLink><NavLink className={getNavClass} to="/expenses">Ledger</NavLink><NavLink className="nav-avatar" to="/profile" aria-label="Open profile">{currUser.name?.charAt(0)?.toUpperCase() || "U"}</NavLink></> : <NavLink className="nav-cta" to="/signup">Get started <span aria-hidden="true">→</span></NavLink>}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
