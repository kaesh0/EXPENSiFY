import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const signUpSchema = z.object({
  name: z.string().min(1, "Name should not be empty"),
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .trim()
    .min(8, "Passoword must contain atleast 8 characters"),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
};
function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: initialValues,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  async function handleSignUp(formValues) {
    setError("");
    setSubmitting(true);
    try {
      await signUp(formValues);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
    finally{
      setSubmitting(false);
    }
  }
  return (
    <main className="auth-page">
      <div className="auth-layout">
        <section className="auth-intro">
          <p className="auth-kicker">Start with clarity</p>
          <h1>A calmer way to build better money habits.</h1>
          <p>Create your free account and start seeing your income, expenses, and savings in one simple place.</p>
        </section>
        <div>
          {error && <p className="auth-alert" role="alert">{error}</p>}
          <form className="auth-card auth-form" onSubmit={handleSubmit(handleSignUp)}>
            <div className="auth-card-header">
              <h2>Create your account</h2>
              <p>Start tracking your expenses today.</p>
            </div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" autoComplete="name" {...register("name")} />
            <p className="auth-error">{errors.name?.message}</p>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="email" {...register("email")} />
            <p className="auth-error">{errors.email?.message}</p>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" autoComplete="new-password" {...register("password")} />
            <p className="auth-error">{errors.password?.message}</p>
            <button className="auth-submit" type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Create free account"}
            </button>
            <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          </form>
        </div>
      </div>
    </main>
  );
}
export default SignUp;
