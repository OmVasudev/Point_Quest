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
import Image from "next/image";
import logo from "@/app/icon.png";

// Define an interface for the club data
interface ClubData {
  name: string;
  tagline: string;
  logo: string;
}

interface ClubCardProps {
  club: ClubData;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="card w-96 shadow-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="flex justify-center mt-4">
          <Image
            src={logo}
            // src={club.logo}
            alt={`${club.name} Logo`}
            width={150}
            height={150}
          />
        </div>

        <div className="card-body items-center text-center">
          <h1 className="card-title">{club.name}</h1>
          <p>{club.tagline}</p>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
