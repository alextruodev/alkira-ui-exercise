import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../auth/useAuth";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/authSchemas";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setLoginError("");

    const loginSuccessful = login(data.email, data.password);

    if (!loginSuccessful) {
      setLoginError("Invalid email or password.");
      return;
    }

    navigate("/mfa");
  };

  return (
    <main className="page">
      <section className="auth-card">
        <h1>Sign in</h1>

        <p className="subtitle">
          Enter your credentials to continue.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
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
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />

            {errors.password && (
              <p className="error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginError && (
            <p className="error" role="alert">
              {loginError}
            </p>
          )}

          <button
            className="primary-button"
            type="submit"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}