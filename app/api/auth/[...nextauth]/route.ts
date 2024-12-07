import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { findStudent } from "@/app/_lib/data-service";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages:{
    signIn:'/login'
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
