import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router";

import { AuthProvider } from "../auth/AuthProvider";
import LoginPage from "../pages/LoginPage";
import MfaPage from "../pages/MfaPage";

function renderMfaFlow() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mfa" element={<MfaPage />} />
          <Route
            path="/dashboard"
            element={<h1>Dashboard Test Page</h1>}
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("MfaPage", () => {
  it("shows an error for an invalid MFA code", async () => {
    const user = userEvent.setup();

    renderMfaFlow();

    await user.type(
      screen.getByLabelText(/email/i),
      "viewer@alkira.test",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "Viewer123!",
    );

    await user.click(
      screen.getByRole("button", { name: /sign in/i }),
    );

    await user.type(
      screen.getByLabelText(/verification code/i),
      "111111",
    );

    await user.click(
      screen.getByRole("button", { name: /verify/i }),
    );

    expect(
      await screen.findByText("Invalid MFA code."),
    ).toBeInTheDocument();
  });

  it("accepts the correct MFA code and navigates to the dashboard", async () => {
    const user = userEvent.setup();

    renderMfaFlow();

    await user.type(
      screen.getByLabelText(/email/i),
      "viewer@alkira.test",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "Viewer123!",
    );

    await user.click(
      screen.getByRole("button", { name: /sign in/i }),
    );

    await user.type(
      screen.getByLabelText(/verification code/i),
      "123456",
    );

    await user.click(
      screen.getByRole("button", { name: /verify/i }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /dashboard test page/i,
      }),
    ).toBeInTheDocument();
  });

  it("redirects to login when MFA is accessed without logging in", async () => {
    render(
      <MemoryRouter initialEntries={["/mfa"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<h1>Login Test Page</h1>} />
            <Route path="/mfa" element={<MfaPage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", {
        name: /login test page/i,
      }),
    ).toBeInTheDocument();
  });
});