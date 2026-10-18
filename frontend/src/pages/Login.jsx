import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const loginSchema=z.object({
  email:z.email("Enter a valid email"),
  password:z.string().min(1,"Password should not be empty"),
})
const initialValues={email:"",password:""}
function Login() {
  const  {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(loginSchema),defaultValues:initialValues})
  const [submitting, setSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleLogin(formValues) {
    setSubmitting(true);
    try {
      await login(formValues);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main>

      <form
        className="bg-white rounded-md p-6 mt-5 w-full mx-auto max-w-xl shadow-md flex flex-col gap-4 "
        onSubmit={handleSubmit(handleLogin)}
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
          {...register("email")}
        />
        <p>{errors.email && errors.email.message}</p>
        <label className="block text-lg font-medium " htmlFor="password">
          Password
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          id="password"
          type="password"
          {...register("password")}
        />
        <p>{errors.password && errors.password.message}</p>
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
