import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <div>
        <h2>EXPENSE FLOW</h2>
        <Link to="/">HOME</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/signup">SIGN UP</Link>
        <Link to="/expenses"> YOUR EXPENSES</Link>
        <Link to="/profile">PROFILE</Link>
        <Link to="/logout">LOGOUT</Link>
      </div>
    </nav>
  );
}
export default Navbar;
