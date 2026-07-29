import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleOnChange(e) {
    const name = e.target.name;
    setError("");
    setLoginInfo((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }
  async function handleLogin(e) {
    e.preventDefault();
    if (!loginInfo.email.trim() || !loginInfo.password.trim()) {
      setError("All fields are required");
      return;
    }
    setSubmitting(true);
    try {
      setError("");
      await login(loginInfo);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main>
      {error && <p>{error}</p>}

      <form
        className="bg-white rounded-md p-6 mt-5 w-full mx-auto max-w-xl shadow-md flex flex-col gap-4 "
        onSubmit={handleLogin}
      >
        <div>
          <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
          <p className="text-center text-gray-600">Sign in to continue managing your expenses</p>
        </div>
        <label className="block text-lg font-medium " htmlFor="email">
          Email
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          id="email"
          type="email"
          name="email"
          disabled={submitting}
          value={loginInfo.email}
          onChange={handleOnChange}
        />
        <label className="block text-lg font-medium " htmlFor="password">
          Password
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          id="password"
          type="password"
          name="password"
          disabled={submitting}
          value={loginInfo.password}
          onChange={handleOnChange}
        />
        <div className="flex justify-start">
          <button
            className="bg-blue-500 rounded-md text-lg font-medium px-2 py-1  hover:bg-blue-600 transition-colors duration-200"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Hold Tight....." : "Login"}
          </button>
        </div>
      </form>
    </main>
  );
}
export default Login;
