import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState('');
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  function handleFormData(e) {
    const name = e.target.name;
    setError('');
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if(!formData.name.trim() || !formData.email.trim() || !formData.password.trim()){
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      setError('')
      const data = await signUp(formData);
      console.log(data.message);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          disabled={loading}
          value={formData.name}
          onChange={handleFormData}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          disabled={loading}
          value={formData.email}
          onChange={handleFormData}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          disabled={loading}
          value={formData.password}
          onChange={handleFormData}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up....." : "Sign Up"}
        </button>
      </form>
    </>
  );
}
export default SignUp;
