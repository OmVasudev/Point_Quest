// import React from "react";
// import logo from "@/app/icon.png";
// import Image from "next/image";

// export default function ClubCard() {
//   return (
//     <div className="flex justify-center">
//       <div className="card w-96 shadow-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//         <div className="flex justify-center mt-4">
//           <Image src={logo} alt="Logo" width={150} height={150} className="" />
//         </div>

//         <div className="card-body items-center text-center">
//           <h1 className="card-title text-white">Point Quest</h1>
//           <p className="text-white">
//             Centralized Platform for College Club Activities
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
// import Image from "next/image";
import Link from "next/link";

// Define an interface for the club data
interface ClubData {
  name: string;
  faculty: string;
  image: string;
}

interface ClubCardProps {
  club: ClubData;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="card w-96 shadow-2xl bg-gradient-to-r from-blue-700 to-cyan-500 text-white">
        <div className="flex justify-center  mt-8">
          <img
            // src={logo}
            src={club.image}
            alt={`${club.name} Logo`}
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>

        <div className="card-body items-center text-center">
          <h1 className="text-2xl font-bold ">{club.name}</h1>
          <p>
            <strong>Faculty Coordinator: </strong>
            {club.faculty}
          </p>
          <Link className="w-full" href="/student/clubs/club">
            <button className=" bg-white w-full mt-4  text-accent-400 hover:text-accent-500 font-semibold py-2 px-4 rounded-lg">
              View Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
