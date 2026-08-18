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
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";

function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mfa" element={<MfaPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

async function loginAndVerify(
  email: string,
  password: string,
) {
  const user = userEvent.setup();

  await user.type(
    screen.getByLabelText(/email/i),
    email,
  );

  await user.type(
    screen.getByLabelText(/password/i),
    password,
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

  return user;
}

describe("DashboardPage", () => {
  it("disables editing for a read-only user", async () => {
    renderApp();

    await loginAndVerify(
      "viewer@alkira.test",
      "Viewer123!",
    );

    expect(
      await screen.findByText("Read Only"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /edit configuration/i,
      }),
    ).toBeDisabled();

    expect(
      screen.getByText(/read-only access/i),
    ).toBeInTheDocument();
  });

  it("enables editing for a read-write user", async () => {
    renderApp();

    await loginAndVerify(
      "editor@alkira.test",
      "Editor123!",
    );

    expect(
      await screen.findByText("Read / Write"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /edit configuration/i,
      }),
    ).toBeEnabled();
  });
});