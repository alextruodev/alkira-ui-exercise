import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../auth/useAuth";
import {
  mfaSchema,
  type MfaFormData,
} from "../schemas/authSchemas";

export default function MfaPage() {
  const navigate = useNavigate();

  const {
    pendingUser,
    isAuthenticated,
    verifyMfa,
  } = useAuth();

  const [mfaError, setMfaError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MfaFormData>({
    resolver: zodResolver(mfaSchema),
    defaultValues: {
      code: "",
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!pendingUser) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = (data: MfaFormData) => {
    setMfaError("");

    const verified = verifyMfa(data.code);

    if (!verified) {
      setMfaError("Invalid MFA code.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="page">
      <section className="auth-card">
        <h1>Verify your identity</h1>

        <p className="subtitle">
          Enter the 6-digit verification code to continue.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label htmlFor="code">
              Verification code
            </label>

            <input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              {...register("code")}
            />

            {errors.code && (
              <p className="error" role="alert">
                {errors.code.message}
              </p>
            )}
          </div>

          {mfaError && (
            <p className="error" role="alert">
              {mfaError}
            </p>
          )}

          <button
            className="primary-button"
            type="submit"
            disabled={isSubmitting}
          >
            Verify
          </button>
        </form>

        <div className="demo-note">
          Demo MFA code: <strong>123456</strong>
        </div>
      </section>
    </main>
  );
}