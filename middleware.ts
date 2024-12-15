export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/student/profile",
    "/student/studentDashboard",
    "/student/clubs",
    "/bod/addEvent",
    "/bod/updatePoints",
    "/admin/addBod",
    "/admin/addClub",
  ],
};

// import { default as NextAuthMiddleware } from 'next-auth/middleware';

// export { NextAuthMiddleware as default };

// export const config = {
//   matcher: ['/student/profile', '/student/studentDashboard','/student/clubs'],
// };
