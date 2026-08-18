import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router";

import { AuthProvider } from "../auth/AuthProvider";
import LoginPage from "../pages/LoginPage";

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("LoginPage", () => {
  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.click(
      screen.getByRole("button", { name: /sign in/i }),
    );

    expect(
      await screen.findByText("Email is required"),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Password is required"),
    ).toBeInTheDocument();
  });

  it("shows an error for invalid credentials", async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.type(
      screen.getByLabelText(/email/i),
      "fake@example.com",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "Password123!",
    );

    await user.click(
      screen.getByRole("button", { name: /sign in/i }),
    );

    expect(
      await screen.findByText("Invalid email or password."),
    ).toBeInTheDocument();
  });

  it("accepts valid credentials and navigates to MFA", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mfa" element={<h1>MFA Test Page</h1>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );

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

    expect(
      await screen.findByRole("heading", {
        name: /mfa test page/i,
      }),
    ).toBeInTheDocument();
  });
});