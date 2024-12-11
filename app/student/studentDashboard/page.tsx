import React from "react";
import {
  getParticipatedEvent,
  getParticipatedClub,
  updateStudentPoints,
  getParticipatedStudent,
  getParticipatedBod,
  getParticipatedAdmin,
  updateBodPoints,
  updateAdminPoints,
  getBod,
  getAdmin,
} from "../../_lib/data-service";
import { Reddit_Sans } from "next/font/google";
import { getStudent } from "@/app/_lib/data-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Define weights you need for different text elements
});

export default async function Page() {
  const session = await getServerSession(authOptions);
  const studentId = Number(session?.user.id);
  const role = session?.user.role;
  let participations;
  if (role === "student") {
    participations = await getParticipatedStudent(studentId);
  }
  if (role === "bod") {
    participations = await getParticipatedBod(studentId);
  }
  if (role === "admin") {
    participations = await getParticipatedAdmin(studentId);
  }

  if (!participations || participations.length === 0) {
    return <div>No events found for this student.</div>;
  }

  let totalPoints = 0;
  const eventsWithClubs = await Promise.all(
    participations.map(async ({ eventId }) => {
      const event = await getParticipatedEvent(eventId);

      if (!event) return null;

      totalPoints += event.points;
      const club = await getParticipatedClub(event.clubId);
      return { event, club };
    }),
  );

  let studentData;
  if (role === "student") {
    await updateStudentPoints(studentId, totalPoints);
    studentData = await getStudent(studentId);
  } else if (role === "bod") {
    await updateBodPoints(studentId, totalPoints);
    studentData = await getBod(studentId);
  } else {
    await updateAdminPoints(studentId, totalPoints);
    studentData = await getAdmin(studentId);
  }

  // console.log(studentData);

  return (
    <div
      className={`${redditSans.className} flex min-h-screen items-center justify-center bg-white`}
    >
      <div className="w-full bg-white px-5 pb-7 lg:w-4/5 lg:px-10">
        {/* Title */}
        <div className="pb-5 text-center text-4xl text-black lg:pb-10 lg:text-5xl">
          Student Dashboard
        </div>

        {/* Top Cards Section */}
        <div className="grid grid-cols-1 items-start gap-5 pb-10 pt-5 lg:grid-cols-7 lg:gap-10">
          {/* Student Info Card */}
          <div className="flex flex-col rounded-2xl bg-gradient-to-r from-customBlue1 to-cyan-500 p-5 text-white shadow-2xl lg:col-span-5">
            <div className="grid grid-cols-1 items-start md:grid-cols-2">
              <div className="flex flex-col items-center justify-between">
                <h2 className="font-primary text-2xl font-bold lg:text-3xl">
                  {studentData.firstName + " " + studentData.lastName}
                </h2>
                <p className="text-lg lg:text-xl">{studentData.USN}</p>
              </div>

              <div className="flex flex-col items-center justify-between">
                <p className="text-lg lg:text-xl">{studentData.passingYear}</p>
                <p className="text-lg lg:text-xl">{studentData.branch}</p>
              </div>
            </div>
          </div>

          {/* Activity Points Card */}
          <div className="flex flex-col items-center justify-between rounded-2xl bg-gradient-to-l from-blue-700 to-cyan-500 p-5 text-white shadow-2xl lg:col-span-2">
            <div className="flex flex-col items-center justify-center">
              <p>Total Activity Points Earned</p>
              <h1 className="text-3xl font-bold lg:text-4xl">
                {studentData.points}
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom Card with Events Table */}
        <div className="rounded-2xl bg-blue-50 pb-7 pl-5 pr-5 pt-7 shadow-2xl lg:pl-10 lg:pr-10">
          <h3 className="mb-4 font-primary text-lg font-bold text-black lg:text-xl">
            Participated Events:
          </h3>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-900 text-center text-white">
                  <th className="px-4 py-3 font-semibold">Club Name</th>
                  <th className="px-4 py-3 font-semibold">Activity Name</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Points</th>
                  <th className="px-4 py-3 font-semibold">Certificate</th>
                </tr>
              </thead>
              <tbody>
                {eventsWithClubs.map((item, index) =>
                  item && item.event ? (
                    <tr key={index} className="border-t text-center">
                      <td className="px-4 py-3 font-semibold text-black">
                        {item.club ? item.club.name : "Club not found"}
                      </td>
                      <td className="px-4 py-3 text-black">
                        {item.event.name}
                      </td>
                      <td className="px-4 py-3 text-black">
                        {item.event.date}
                      </td>
                      <td className="px-4 py-3 text-black">
                        {item.event.points}
                      </td>
                      <td className="px-4 py-3 text-black">
                        <a
                          href={item.event.link}
                          className="rounded-2xl bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-800"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td colSpan={5} className="px-4 py-2 text-center">
                        Event data not found
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
