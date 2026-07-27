import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const[error,setError]=useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleOnChange(e) {
    const name = e.target.name;
    setError('')
    setLoginInfo((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }
  async function handleLogin(e){
    e.preventDefault();
    if(!loginInfo.email.trim() || !loginInfo.password.trim()){
      setError('All fields are required');
      return;
    }
    setSubmitting(true);
    try {
      setError('');
      await login(loginInfo);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          disabled={submitting}
          value={loginInfo.email}
          onChange={handleOnChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          disabled={submitting}
          value={loginInfo.password}
          onChange={handleOnChange}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Hold Tight....." : "Login"}
        </button>
      </form>
    </>
  );
}
export default Login;
