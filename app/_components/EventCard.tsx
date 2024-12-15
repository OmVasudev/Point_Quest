// "use client";
// import React, { useState } from "react";
// import Link from "next/link";

// // Define an interface for event data
// interface EventData {
//   name: string;
//   contact?: string;
//   description: string;
//   image: string;
//   link: string;
//   date: string;
//   points: number;
// }

// interface EventCardProps {
//   data: EventData;
// }

// const EventCard: React.FC<EventCardProps> = ({ data }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Function to toggle dialog box visibility
//   const toggleDialog = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       {/* Event Card */}
//       <div className="card bg-base-100 w-full bg-primary-50 shadow-xl">
//         <figure>
//           <img src={data.image} alt={data.name} />
//         </figure>
//         <div className="card-body justify-center items-center text-black">
//           <h2 className="card-title font-redressed ">{data.name}</h2>
//           <p className="text-center">
//             <strong>Deadline:</strong> {data.date}
//           </p>
//           <div className="flex justify-center mt-2">
//             <div className="bg-secondary-700 text-white py-2 px-3 rounded-full text-xl font-bold animate-pulse">
//               {data.points}
//             </div>
//             <div className="text-xl text-primary-800 font-semibold mt-2 px-2">
//               Activity Points
//             </div>
//           </div>
//         </div>
//         <div className="card-actions pb-6 px-8 justify-between items-center mt-4">
//           <button
//             onClick={toggleDialog}
//             className="border border-accent-500 text-accent-500  font-semibold py-2 px-4 rounded-lg hover:bg-secondary-50 hover:text-primary-600"
//           >
//             View Details
//           </button>
//           <Link href={data.link}>
//             <button className="bg-accent-500  hover:bg-accent-400 text-white font-semibold py-2 px-4 rounded-lg ">
//               Register
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Dialog Box */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg">
//             <div className="flex">
//               {/* {!isOpen && (
//                 <div className="w-1/3 pr-4">
//                   <img
//                     src={data.image}
//                     alt={data.name}
//                     className="rounded-lg"
//                   />
//                   <div className="mt-4 p-4 flex flex-col  justify-center items-center py-4">
//                     <div className="bg-secondary-700 font-redressed text-white py-3 px-3 rounded-full text-4xl font-bold animate-pulse">
//                       {data.points}
//                     </div>
//                     <h1 className="text-xl text-black font-redressed font-bold pt-4">
//                       Activity Points
//                     </h1>
//                   </div>
//                 </div>
//               )} */}

//               <div className={`w-full md:pl-4 text-black`}>
//                 <h2 className="text-2xl font-redressed font-bold mb-2">
//                   {data.name}
//                 </h2>
//                 <p className="mb-4">{data.description}</p>
//                 <div className="text-sm font-medium">
//                   <h1 className="text-xl">Contact:</h1>
//                   <p>{data.contact}</p>
//                 </div>
//                 <div className="flex justify-end mt-6 space-x-4">
//                   <button
//                     onClick={toggleDialog}
//                     className="border border-accent-500 text-accent-500 font-semibold py-2 px-4 rounded-lg hover:bg-primary-50 hover:text-accent-400"
//                   >
//                     Close
//                   </button>
//                   <Link href={data.link}>
//                     <button className="bg-accent-500  hover:bg-accent-400 text-white font-semibold py-2 px-4 rounded-lg ">
//                       Register
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventCard;

// Define an interface for event data
"use client";
import React, { useState } from "react";
import Link from "next/link";
interface EventData {
  name: string;
  contact?: string;
  description: string;
  image: string;
  link: string;
  date: string;
  points: number;
}

interface EventCardProps {
  data: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle dialog box visibility
  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Event Card */}
      <div className="card h-[400px] w-80 bg-base-100 bg-primary-50 shadow-xl">
        {" "}
        {/* Fixed card size */}
        <figure className="h-40 w-full overflow-hidden">
          {" "}
          {/* Fixed image size */}
          <img
            src={data.image}
            alt={data.name}
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body items-center justify-center text-black">
          <h2 className="font-redressed card-title text-center text-lg">
            {data.name}
          </h2>
          <p className="text-center text-sm">
            <strong>Deadline:</strong> {data.date}
          </p>
          <div className="mt-2 flex justify-center">
            <div className="animate-pulse rounded-full bg-secondary-700 px-3 py-2 text-lg font-bold text-white">
              {data.points}
            </div>
            <div className="mt-2 px-2 text-lg font-semibold text-primary-800">
              Activity Points
            </div>
          </div>
        </div>
        <div className="card-actions mt-4 items-center justify-between px-6 pb-4">
          <button
            onClick={toggleDialog}
            className="rounded-lg border border-accent-500 px-4 py-1.5 font-semibold text-accent-500 hover:bg-secondary-50 hover:text-primary-600"
          >
            View Details
          </button>
          <Link href={data.link}>
            <button className="rounded-lg bg-accent-500 px-4 py-1.5 font-semibold text-white hover:bg-accent-400">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <div className="flex">
              <div className={`w-full text-black md:pl-4`}>
                <h2 className="font-redressed mb-2 text-2xl font-bold">
                  {data.name}
                </h2>
                <p className="mb-4">{data.description}</p>
                <div className="text-sm font-medium">
                  <h1 className="text-xl">Contact:</h1>
                  <p>{data.contact}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={toggleDialog}
                    className="rounded-lg border border-accent-500 px-4 py-2 font-semibold text-accent-500 hover:bg-primary-50 hover:text-accent-400"
                  >
                    Close
                  </button>
                  <Link href={data.link}>
                    <button className="rounded-lg bg-accent-500 px-4 py-2 font-semibold text-white hover:bg-accent-400">
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
