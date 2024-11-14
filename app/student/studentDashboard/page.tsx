// import React from "react";
// import {
//   getParticipated,
//   getParticipatedEvent,
//   getParticipatedClub,
//   updateStudentPoints,
// } from "../../_lib/data-service";

// export default async function Page() {
//   const studentId = 1;

//   const participations = await getParticipated(studentId);

//   if (!participations || participations.length === 0) {
//     return <div>No events found for this student.</div>;
//   }

//   let totalPoints = 0;
//   const eventsWithClubs = await Promise.all(
//     participations.map(async ({ eventId }) => {
//       const event = await getParticipatedEvent(eventId);

//       if (!event) return null;

//       totalPoints += event.points;
//       const club = await getParticipatedClub(event.clubId);
//       return { event, club };
//     })
//   );

//   await updateStudentPoints(studentId, totalPoints);

//   return (
//     <div>
//       <h2>Students Updated Points: {totalPoints}</h2>
//       <h3>Participated Events:</h3>
//       {eventsWithClubs.map((item, index) =>
//         item && item.event ? (
//           <div key={index}>
//             <p>
//               <strong>Event Name:</strong> {item.event.name}
//             </p>
//             <p>
//               <strong>Date:</strong> {item.event.date}
//             </p>
//             <p>
//               <strong>Points:</strong> {item.event.points}
//             </p>
//             <p>
//               <strong>Link:</strong>{" "}
//               <a href={item.event.link}>{item.event.link}</a>
//             </p>
//             {item.club ? (
//               <p>
//                 <strong>Club:</strong> {item.club.name}
//               </p>
//             ) : (
//               <p>Club information not found</p>
//             )}
//           </div>
//         ) : (
//           <p key={index}>Event data not found</p>
//         )
//       )}
//     </div>
//   );
// }

import React from "react";
import {
  getParticipated,
  getParticipatedEvent,
  getParticipatedClub,
  updateStudentPoints,
} from "../../_lib/data-service";
import { Reddit_Sans } from "next/font/google";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Define weights you need for different text elements
});

export default async function Page() {
  const studentId = 1; // Assume this is dynamic and can come from props or context.

  const participations = await getParticipated(studentId);

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
    })
  );

  // Update student's total points after calculating
  await updateStudentPoints(studentId, totalPoints);

  // Fetching dynamic student data (this could be a real API call instead of hardcoded)
  const studentData = {
    name: "John Doe", // Fetch from API
    id: "2GI21CS000", // Fetch from API
    year: "3rd Year", // Fetch from API
    department: "CSE", // Fetch from API
    points: totalPoints, // Calculated above
  };

  return (
    <div
      className={`${redditSans.className}  bg-white min-h-screen flex items-center justify-center`}
    >
      <div className="bg-white w-3/5 pt-7 pb-7 p-10">
        {/* Title */}
        <div className="text-5xl  text-black pb-10">Student Dashboard</div>

        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-10 items-start pt-5 pb-10 ">
          {/* Student Info Card */}
          <div className="bg-gradient-to-r from-customBlue1 to-cyan-500 text-white p-5 rounded-2xl shadow-2xl flex flex-col md:col-span-5   ">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start">
              <div className=" flex flex-col md:col-span-1 items-center justify-between ">
                <h2 className="text-3xl font-bold">{studentData.name}</h2>
                <p className="text-xl">{studentData.id}</p>
              </div>

              <div className=" flex flex-col md:col-span-1 items-center justify-between ">
                <p className="text-xl">{studentData.year}</p>
                <p className="text-xl">{studentData.department}</p>
              </div>
            </div>
          </div>

          {/* Activity Points Card */}
          <div className="bg-gradient-to-l from-blue-700 to-cyan-500 text-white p-5 rounded-2xl shadow-2xl flex flex-col md:col-span-2 items-center justify-between ">
            <div className="flex flex-col items-center justify-center">
              <p>Total Activity Points Earned</p>
              <h1 className="text-4xl font-bold ">{studentData.points}</h1>
            </div>
          </div>
        </div>

        {/* Bottom Card with Events Table */}
        <div className="bg-blue-50 rounded-2xl shadow-2xl pt-7 pb-7 pr-10 pl-10 items-center justify-between">
          <h3 className="text-black text-xl font-bold mb-4">
            Participated Events:
          </h3>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full table-auto ">
              <thead>
                <tr className="bg-blue-900  text-white text-center ">
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
                    <tr key={index} className=" border-t text-center ">
                      <td className=" text-black font-semibold px-4 py-3">
                        {item.club ? item.club.name : "Club not found"}
                      </td>
                      <td className=" text-black px-4 py-3">
                        {item.event.name}
                      </td>
                      <td className=" text-black px-4 py-3">
                        {item.event.date}
                      </td>
                      <td className=" text-black px-4 py-3">
                        {item.event.points}
                      </td>
                      <td className=" text-black px-4 py-3">
                        <a
                          href={item.event.link}
                          className="bg-blue-500 text-white px-3 py-1 rounded-2xl hover:bg-blue-800 transition"
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
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
