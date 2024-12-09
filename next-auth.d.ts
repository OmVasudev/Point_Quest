import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: string; // Add role to Session
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sub?: string;
    role?: string; // Add role to JWT
  }
}
