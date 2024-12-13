import { getEvents } from "@/app/_lib/data-service";
import React from "react";

import EventCard from "@/app/_components/EventCard";

// const eventsData = [
//   {
//     title: "Tech Conference 2024",
//     tagline: "The Future of Technology",
//     deadline: "22nd November 2024, 11:59 am",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     description:
//       "Join us for an inspiring event where industry leaders share the latest advancements.",
//     contact: "contact@techconference.com",
//   },
//   {
//     title: "AI Innovation Summit",
//     tagline: "Leading AI Research and Applications",
//     deadline: "5th December 2024, 9:00 am",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     description:
//       "A deep dive into cutting-edge AI technologies with top-tier speakers.",
//     contact: "contact@aisummit.com",
//   },
//   {
//     title: "Startup Expo 2024",
//     tagline: "Showcasing the Best New Startups",
//     deadline: "15th December 2024, 5:00 pm",
//     imageUrl:
//       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
//     description:
//       "Explore groundbreaking startups and network with entrepreneurs.",
//     contact: "info@startupexpo.com",
//   },
// ];

// export default async function page({ params }) {
//   const events = await getEvents();
//   // console.log(events);
//   console.log(params);
//   return (
//     <div className="flex flex-col items-center  justify-center relative bg-white">
//       <h1 className="text-4xl text-black font-primary font-semibold py-6">
//         Upcoming Events
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-9">
//         {events.map((event, index) => (
//           <EventCard key={index} data={event} />
//         ))}
//       </div>
//     </div>
//   );
// }
export default async function Page({ params }: { params: { clubId: string } }) {
  try {
    const { clubId } = params; // Extract clubId from params
    console.log("Club ID:", clubId, "Type:", typeof clubId);

    const events = await getEvents(); // Fetch all events
    // console.log("Events:", events);

    // Log type of event.clubId for debugging
    events.forEach((event, index) => {
      console.log(
        `Event ${index} Club ID:`,
        event.clubId,
        "Type:",
        typeof event.clubId
      );
    });

    // Ensure consistent types for comparison
    console.log("clubid from param", clubId);
    const filteredEvents = events.filter(
      (event) => event.clubId.toString() === clubId
    );

    console.log("Filtered Events:", filteredEvents);

    return (
      <div className="flex flex-col items-center justify-center relative bg-white">
        <h1 className="text-4xl text-black font-primary font-semibold py-6 m-5">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-9">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard key={index} data={event} />
            ))
          ) : (
            <p className="text-gray-500">No events available for this club.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading events:", error);
    return (
      <p className="text-red-500">
        Failed to load events. Please try again later.
      </p>
    );
  }
}
