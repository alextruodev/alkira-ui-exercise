import type { User } from "./types";

export const MOCK_MFA_CODE = "123456";

export const mockUsers: User[] = [
  {
    email: "viewer@alkira.test",
    password: "Viewer123!",
    role: "read-only",
    name: "Read Only User",
  },
  {
    email: "editor@alkira.test",
    password: "Editor123!",
    role: "read-write",
    name: "Read Write User",
  },
];