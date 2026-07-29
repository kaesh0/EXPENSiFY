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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  function handleFormData(e) {
    const name = e.target.name;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      setError("");
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
    <main>
      {error && <p>{error}</p>}
     
      <form
        className="bg-white rounded-md p-6 mt-5 w-full mx-auto max-w-xl shadow-md flex flex-col gap-4 "
        onSubmit={handleSubmit}
      >
         <div>
        <h1  className="text-center text-3xl font-bold">Create your account</h1>
        <p className="text-center text-gray-600">Start tracking your expenses today</p>
      </div>
        <label className="block text-lg font-medium " htmlFor="name">
          Name
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          id="name"
          type="text"
          name="name"
          disabled={loading}
          value={formData.name}
          onChange={handleFormData}
        />
        <label className="block text-lg font-medium " htmlFor="email">
          Email
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          id="email"
          type="email"
          name="email"
          disabled={loading}
          value={formData.email}
          onChange={handleFormData}
        />
        <label className="block text-lg font-medium " htmlFor="password">
          Password
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          id="password"
          type="password"
          name="password"
          disabled={loading}
          value={formData.password}
          onChange={handleFormData}
        />
        <div className="flex justify-start">
          <button
            className="bg-blue-500 rounded-md text-lg font-medium px-2 py-1  hover:bg-blue-600 transition-colors duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up....." : "Sign Up"}
          </button>
        </div>
      </form>
    </main>
  );
}
export default SignUp;
