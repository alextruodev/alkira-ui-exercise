export type UserRole = "read-only" | "read-write";

export interface User {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}