import { useState} from "react";
import {useNavigate} from 'react-router-dom';
function Login() {
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  function handleOnChange(e) {
    const name = e.target.name;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      navigate("/expenses",{replace:true});
    } catch(err){
      console.log(err.message)
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          disabled={loading}
          value={loginInfo.email}
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          disabled={loading}
          value={loginInfo.password}
          onChange={handleOnChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Hold Tight....." : "Login"}
        </button>
      </form>
    </>
  );
}
export default Login;
