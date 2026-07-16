import { useState} from "react";
import {useNavigate} from 'react-router-dom';
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleFormData(e) {
    const name = e.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      console.log(data.message);
      navigate("/expenses", { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          disabled={loading}
          value={formData.name}
          onChange={handleFormData}
        />
        <input
          type="email"
          name="email"
          disabled={loading}
          value={formData.email}
          onChange={handleFormData}
        />
        <input
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
