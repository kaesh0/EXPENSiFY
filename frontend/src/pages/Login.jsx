import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <main className="auth-page">
      <div className="auth-layout">
        <section className="auth-intro">
          <p className="auth-kicker">Welcome back</p>
          <h1>Your money, clearly in view.</h1>
          <p>Sign in to keep your expenses organized and make every day spending feel effortless.</p>
        </section>
        <form className="auth-card auth-form" onSubmit={handleSubmit(handleLogin)}>
          <div className="auth-card-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue managing your expenses.</p>
          </div>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" {...register("email")} />
          <p className="auth-error">{errors.email?.message}</p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" {...register("password")} />
          <p className="auth-error">{errors.password?.message}</p>
          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
          <p className="auth-switch">New to Expens!fy? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </main>
  );
}
export default Login;
