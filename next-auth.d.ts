import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add your custom property here
    } & DefaultSession["user"];
  }
}
