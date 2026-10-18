import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
    <main>
      {error && <p>{error}</p>}

      <form
        className="bg-white rounded-md p-6 mt-5 w-full mx-auto max-w-xl shadow-md flex flex-col gap-4 "
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div>
          <h1 className="text-center text-3xl font-bold">
            Create your account
          </h1>
          <p className="text-center text-gray-600">
            Start tracking your expenses today
          </p>
        </div>
        <label className="block text-lg font-medium " htmlFor="name">
          Name
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          id="name"
          type="text"
          {...register("name")}
        />
        <p>{errors.name && errors.name.message}</p>
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
            type="submit" disabled={submitting}
          >
            {submitting ? "Signing Up....." : "Sign Up"}
          </button>
        </div>
      </form>
    </main>
  );
}
export default SignUp;
