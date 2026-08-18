import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signupSchema,
  type SignupFormData,
} from "../schemas/authSchemas";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <main className="page">
      <section className="auth-card">
        <h1>Create an account</h1>

        <p className="subtitle">
          Demo registration only. No account will actually be created.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
            />

            {errors.name && (
              <p className="error" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email</label>

            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />

            {errors.email && (
              <p className="error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>

            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />

            {errors.password && (
              <p className="error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">
              Confirm password
            </label>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="error" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            className="primary-button"
            type="submit"
          >
            Create account
          </button>
        </form>

        {isSubmitSuccessful && (
          <p className="success" role="status">
            Demo account submitted successfully.
          </p>
        )}

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}