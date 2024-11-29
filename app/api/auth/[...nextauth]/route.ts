// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { JWT } from "next-auth/jwt"; // Explicit import for JWT

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         USN: { label: "USN", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error("No credentials provided");
//         }

//         const { USN, password } = credentials;

//         const validUser = {
//           id: "1",
//           name: "John Doe",
//           usn: "2GI21CS027",
//           password: "12345",
//         };

//         if (USN === validUser.usn && password === validUser.password) {
//           return {
//             id: validUser.id,
//             name: validUser.name,
//             usn: validUser.usn,
//           };
//         }

//         throw new Error("Invalid USN or password");
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET || "default-secret-key",
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.usn = user.usn;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       if (token) {
//         session.user = {
//           id: token.id,
//           name: token.name,
//           usn: token.usn,
//         };
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { findStudent } from "@/app/_lib/data-service";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        firstName: {},
        lastName: {},
        email: {},
        password: {},
        phoneNo: {},
        branch: {},
        usn: {},
        passingYear: {},
      },
      async authorize(credentials, req) {
        console.log("Starting authorization...");

        // Validate USN
        if (!credentials?.usn) {
          console.error("USN is undefined");
          return null;
        }

        // Fetch student from the database
        console.log("Fetching student data...");
        const response = await findStudent(credentials?.usn);
        console.log("Student data received:", { response });

        // Validate password
        if (!credentials.password) {
          console.error("Password is required");
          return null;
        }

        if (!response || !response.password) {
          console.error("Invalid student data or password not found");
          return null;
        }

        // Check if the password is correct
        const passwordCorrect = await compare(
          credentials.password,
          response.password
        );
        console.log("Password comparison result:", { passwordCorrect });

        if (passwordCorrect) {
          console.log("Authentication successful");
          return {
            id: response.id,
            usn: response.USN,
          };
        } else {
          console.log("Authentication failed");
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
