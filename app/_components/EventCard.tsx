"use client";
import React, { useState } from "react";

// Define an interface for event data
interface EventData {
  name: string;
  contact?: string;
  description: string;
  image: string;
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
      <div className="card bg-base-100 w-full bg-primary-50 shadow-xl">
        <figure>
          <img src={data.image} alt={data.name} />
        </figure>
        <div className="card-body justify-center items-center text-black">
          <h2 className="card-title font-redressed ">{data.name}</h2>
          <p className="text-center">
            <strong>Deadline:</strong> {data.date}
          </p>
          <div className="flex justify-center mt-2">
            <div className="bg-secondary-700 text-white py-2 px-3 rounded-full text-xl font-bold animate-pulse">
              {data.points}
            </div>
            <div className="text-xl text-primary-800 font-semibold mt-2 px-2">
              Activity Points
            </div>
          </div>
        </div>
        <div className="card-actions pb-6 px-8 justify-between items-center mt-4">
          <button
            onClick={toggleDialog}
            className="border border-accent-500 text-accent-500  font-semibold py-2 px-4 rounded-lg hover:bg-secondary-50 hover:text-primary-600"
          >
            View Details
          </button>
          <button className=" bg-accent-500  hover:bg-accent-400  text-white font-semibold py-2 px-4 rounded-lg">
            Register
          </button>
        </div>
      </div>

      {/* Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg">
            <div className="flex">
              {/* {!isOpen && (
                <div className="w-1/3 pr-4">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="rounded-lg"
                  />
                  <div className="mt-4 p-4 flex flex-col  justify-center items-center py-4">
                    <div className="bg-secondary-700 font-redressed text-white py-3 px-3 rounded-full text-4xl font-bold animate-pulse">
                      {data.points}
                    </div>
                    <h1 className="text-xl text-black font-redressed font-bold pt-4">
                      Activity Points
                    </h1>
                  </div>
                </div>
              )} */}

              <div className={`w-full md:pl-4 text-black`}>
                <h2 className="text-2xl font-redressed font-bold mb-2">
                  {data.name}
                </h2>
                <p className="mb-4">{data.description}</p>
                <div className="text-sm font-medium">
                  <h1 className="text-xl">Contact:</h1>
                  <p>{data.contact}</p>
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    onClick={toggleDialog}
                    className="border border-accent-500 text-accent-500 font-semibold py-2 px-4 rounded-lg hover:bg-primary-50 hover:text-accent-400"
                  >
                    Close
                  </button>
                  <button className="bg-accent-500  hover:bg-accent-400 text-white font-semibold py-2 px-4 rounded-lg ">
                    Register
                  </button>
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

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";

// // Define an interface for event data
// interface EventData {
//   name: string;
//   contact?: string;
//   description: string;
//   image: string;
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
//     <div className="flex justify-center p-6">
//       {/* Event Card */}
//       <div className="card bg-primary-50 w-96 shadow-lg rounded-lg overflow-hidden">
//         <figure>
//           <img
//             src={data.image}
//             alt={data.name}
//             className="w-full h-48 object-cover"
//           />
//         </figure>
//         <div className="card-body p-4">
//           <h2 className="card-title text-primary-600 font-bold text-lg mb-2">
//             {data.name}
//           </h2>
//           <p className="text-sm text-primary-700">
//             <strong>Deadline:</strong> {data.date}
//           </p>
//           <p className="text-sm text-primary-700 mb-4">
//             <strong>Activity Points:</strong> {data.points}
//           </p>
//         </div>
//         <div className="card-actions p-4 flex justify-between items-center">
//           <button
//             onClick={toggleDialog}
//             className="btn bg-secondary-500 text-white rounded-lg px-4 py-2 hover:bg-secondary-600"
//           >
//             View Details
//           </button>
//           <Link
//             href="https://www.figma.com/design/255s4cOaOP90UfEr6Vxy5D/Mini-Project?node-id=278-3130&node-type=canvas&t=Igb7MLUALNQ7SDml-0"
//             target="_blank"
//             className="btn bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600"
//           >
//             Register
//           </Link>
//         </div>
//       </div>

//       {/* Dialog Box */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white w-11/12 max-w-2xl p-8 rounded-lg shadow-lg">
//             <div className="flex">
//               <div className="w-1/3 pr-4">
//                 <img
//                   src={data.image}
//                   alt={data.name}
//                   className="rounded-lg w-full object-cover h-48"
//                 />
//                 <div className="mt-4 p-4 flex flex-col rounded-lg bg-secondary-100 text-center">
//                   <h1 className="text-xl font-bold text-primary-700">
//                     Activity Points
//                   </h1>
//                   <div className="text-4xl font-bold text-secondary-500 py-4">
//                     {data.points}
//                   </div>
//                 </div>
//               </div>

//               <div className="w-2/3 pl-4">
//                 <h2 className="text-2xl font-bold text-primary-700 mb-4">
//                   {data.name}
//                 </h2>
//                 <p className="text-sm text-accent-700 mb-4">
//                   {data.description}
//                 </p>
//                 {data.contact && (
//                   <p className="text-sm font-medium text-primary-800 mb-4">
//                     <strong>Contact:</strong> {data.contact}
//                   </p>
//                 )}
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={toggleDialog}
//                     className="btn bg-secondary-500 text-white rounded-lg px-4 py-2 hover:bg-secondary-600"
//                   >
//                     Close
//                   </button>
//                   <button className="btn bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600">
//                     Register
//                   </button>
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
