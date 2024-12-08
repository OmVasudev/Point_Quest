// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import { findStudent } from "@/app/_lib/data-service"; // Replace with your actual import path

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login", // Path to your login page
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         usn: { label: "USN", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Authorize Credentials:", credentials);

//         // Validate credentials
//         if (!credentials?.usn || !credentials.password) {
//           console.error("Missing credentials");
//           return null;
//         }

//         // Fetch user from the database
//         const user = await findStudent(credentials.usn);
//         console.log("Fetched User:", user);

//         if (!user || !user.password) {
//           console.error("Invalid USN or password not found");
//           return null;
//         }

//         // Validate password
//         const isValidPassword = await compare(credentials.password, user.password);
//         console.log("Password Valid:", isValidPassword);

//         if (!isValidPassword) {
//           console.error("Incorrect password");
//           return null;
//         }

//         // Return user object
//         return {
//           id: user.id.toString(),
//           name: user.firstName,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id; // Add user ID to token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token?.sub) {
//         session.user = { ...session.user, id: token.sub }; // Add user ID to session
//       }
//       console.log("Session:", session);
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { findStudent } from "@/app/_lib/data-service"; // Replace with your actual import path
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Path to your login page
  },
  providers: [
    CredentialsProvider({
      credentials: {
        usn: { label: "USN", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize Credentials:", credentials);

        if (!credentials?.usn || !credentials.password) {
          console.error("Missing credentials");
          return null;
        }

        const user = await findStudent(credentials.usn);
        if (!user || !user.password) {
          console.error("Invalid USN or password not found");
          return null;
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password,
        );
        if (!isValidPassword) {
          console.error("Incorrect password");
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.firstName,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.sub = user.id; // Add user ID to token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.sub) {
        session.user = { ...session.user, id: token.sub }; // Add user ID to session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
