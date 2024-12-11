// import NextAuth, { NextAuthOptions, Session } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import { findStudent } from "@/app/_lib/data-service"; // Replace with your actual import path
// import { JWT } from "next-auth/jwt";

// export const authOptions: NextAuthOptions = {
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

//         if (!credentials?.usn || !credentials.password) {
//           console.error("Missing credentials");
//           return null;
//         }

//         const user = await findStudent(credentials.usn);
//         if (!user || !user.password) {
//           console.error("Invalid USN or password not found");
//           return null;
//         }

//         const isValidPassword = await compare(
//           credentials.password,
//           user.password,
//         );
//         if (!isValidPassword) {
//           console.error("Incorrect password");
//           return null;
//         }

//         return {
//           id: user.id.toString(),
//           name: user.firstName,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.sub = user.id; // Add user ID to token
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token?.sub) {
//         session.user = { ...session.user, id: token.sub }; // Add user ID to session
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
import bcrypt from "bcryptjs";

import { findStudent, findBod, findAdmin } from "@/app/_lib/data-service"; // Replace with your actual import paths
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

        const { usn, password } = credentials;
        let user, role;

        // Try to find the user in the student table
        user = await findStudent(usn);
        if (user) {
          role = "student";
        } else {
          // If not found, try in the BOD table
          user = await findBod(usn);
          if (user) {
            role = "bod";
          } else {
            // If not found in BOD, try in the admin table
            user = await findAdmin(usn);
            if (user) {
              role = "admin";
            }
          }
        }

        if (!user || !user.password) {
          console.error("Invalid USN or user not found");
          return null;
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.error("Incorrect password");
          return null;
        }

        // Return user details with role
        return {
          id: user.id.toString(),
          name: user.firstName,
          email: user.email,
          role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.sub = user.id; // Add user ID to token
        token.role = user.role; // Add user role to token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          role: token.role, // Add role to session
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
