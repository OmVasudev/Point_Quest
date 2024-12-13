// import React from "react";
// import Image from "next/image";

// const AboutUs: React.FC = () => {
//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center">
//       <main className="container mx-auto py-16 px-6 lg:px-20">
//         {/* Header Section */}
//         <section className="text-center mb-20">
//           <h1 className="font-primary text-5xl font-extrabold text-gray-900 mb-4">
//             About Us
//           </h1>
//           <p className="text-xl text-gray-600">
//             Revolutionizing Club Management at KLS GIT
//           </p>
//         </section>

//         {/* Mission Section */}
//         <section className="flex flex-col lg:flex-row items-center gap-12 mb-20">
//           <Image
//             src="/img/studentProfilePic.jpg" // Replace with actual image path
//             alt="Our Mission"
//             width={500}
//             height={300}
//             className="rounded-lg shadow-lg"
//           />
//           <div className="lg:w-1/2 text-center lg:text-left">
//             <h2 className="text-3xl font-bold mb-6">
//               Helping Students of KLS GIT Grow Better
//             </h2>
//             <p className="text-lg text-gray-600">
//               We are committed to building a centralized platform that
//               revolutionizes how clubs and students interact. By simplifying
//               event organization and communication, we aim to empower students
//               and club organizers to focus on what matters most: learning and
//               collaboration.
//             </p>
//           </div>
//         </section>

       

//         {/* Story Section */}
//         <section className="flex flex-col lg:flex-row items-center gap-12">
//           <div className="lg:w-1/2 text-center lg:text-left">
//             <h2 className="text-3xl font-bold mb-6">Our Story</h2>
//             <p className="text-lg text-gray-600 mb-4">
//               Point Quest was born out of a vision to streamline club
//               activities, making them more efficient, engaging, and impactful.
//               By providing a centralized platform, we empower students to take
//               an active role in their academic and extracurricular journey.
//             </p>
//             <p className="text-lg text-gray-600">
//               Join us in building a vibrant, collaborative community at KLS GIT.
//             </p>
//           </div>
//           <Image
//             src="/img/studentProfilePic.jpg" // Replace with actual image path
//             alt="Our Story"
//             width={500}
//             height={300}
//             className="rounded-lg shadow-lg"
//           />
//         </section>



//          {/* Services Section */}
//          <section className="text-center mb-20 mt-20">
//           <h2 className="text-3xl font-bold mb-8">Our Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             <div className="p-6 bg-gray-50 shadow-md rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Event Management
//               </h3>
//               <p className="text-gray-600">
//                 Clubs can post events and manage their schedules effortlessly.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 shadow-md rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Activity Points
//               </h3>
//               <p className="text-gray-600">
//                 Students earn activity points for participating in events,
//                 motivating greater involvement.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 shadow-md rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Certification
//               </h3>
//               <p className="text-gray-600">
//                 Participants receive certificates as recognition for their
//                 contributions.
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AboutUs;







// // import React from "react";
// // import Image from "next/image";

// // const Page = () => {
// //   return (
// //     <div className="bg-white">
// //       <main className=" mx-auto py-12 px-12">
// //         {/* About Section */}
// //         <section className="text-center mb-16">
// //           <h1 className="text-5xl font-bold mb-4">About Us</h1>
// //           <p className="text-xl text-gray-600">
// //             Centralized Platform for Clubs
// //           </p>
// //         </section>

// //         {/* Mission Section */}
// //         <section className="flex flex-col lg:flex-row items-center gap-8 mb-16">
// //           <Image
// //             src="/img/header-image.jpeg" // Replace with actual path to the image
// //             alt="Team Mission"
// //             width={500}
// //             height={300}
// //             className="rounded-md shadow-md"
// //           />
// //           <div className="lg:w-1/2">
// //             <h2 className="text-2xl font-bold mb-4">
// //               Our Mission: Helping Students of KLS GIT Grow Better
// //             </h2>
// //             <p className="text-gray-600">
// //               We're building a platform to revolutionize club management at KLS
// //               GIT. Our goal is to simplify event organization, enhance
// //               communication, and streamline administrative tasks. By providing a
// //               unified and accessible solution, we aim to empower both students
// //               and club organizers
// //             </p>
// //           </div>
// //         </section>

// //         {/* Our Story Section */}
// //         <section className="grid lg:grid-cols-2 gap-8 mb-16">
// //           <div>
// //             <h2 className="text-2xl font-bold mb-4">Our Story</h2>
// //             <p className="text-gray-600 mb-4">
// //               We envision a future where club activities at KLS GIT are more
// //               efficient, engaging, and impactful. By providing a centralized
// //               platform, we're empowering students to actively participate in
// //               their academic journey.
// //             </p>
// //             <p className="text-gray-600">
// //               Join us in building a better future for KLS GIT.
// //             </p>
// //           </div>
// //           <Image
// //             src="/img/header-image.jpeg" // Replace with actual path to the image
// //             alt="Story Image"
// //             width={500}
// //             height={300}
// //             className="rounded-md shadow-md"
// //           />
// //         </section>

// //         {/* <section className="text-center">
// //           <h2 className="text-2xl font-bold mb-8">HubSpot By the Numbers</h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
// //             <div>
// //               <h3 className="text-xl font-bold mb-2">12 Global Offices</h3>
// //               <a href="#" className="text-blue-500 underline">
// //                 Learn more
// //               </a>
// //             </div>
// //             <div>
// //               <h3 className="text-xl font-bold mb-2">7,600+ Employees</h3>
// //               <a href="#" className="text-blue-500 underline">
// //                 Learn more
// //               </a>
// //             </div>
// //             <div>
// //               <h3 className="text-xl font-bold mb-2">205,000+ Customers</h3>
// //               <a href="#" className="text-blue-500 underline">
// //                 Learn more
// //               </a>
// //             </div>
// //           </div>
// //         </section> */}
// //       </main>
// //     </div>
// //   );
// // };

// // export default Page;


import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <main className="container mx-auto px-10 py-16 lg:px-20">
        {/* Header Section */}
        <section className="mb-20 text-center">
          <h1 className="mb-4 font-primary text-5xl font-extrabold text-black">
            About Us
          </h1>
          <p className="text-xl text-gray-800">
            Revolutionizing Club Management at KLS GIT
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20 flex flex-col items-center gap-12 lg:flex-row">
          <Image
            src="/img/creation.jpg" // Replace with actual image path
            alt="Our Mission"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
          <div className="text-center lg:w-1/2 lg:text-left">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Helping Students of KLS GIT Grow Better
            </h2>
            <p className="text-lg text-gray-600">
              We are committed to building a centralized platform that
              revolutionizes how clubs and students interact. By simplifying
              event organization and communication, we aim to empower students
              and club organizers to focus on what matters most: learning and
              collaboration.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="text-center lg:w-1/2 lg:text-left">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">Our Story</h2>
            <p className="mb-4 text-lg text-gray-600">
              Point Quest was born out of a vision to streamline club
              activities, making them more efficient, engaging, and impactful.
              By providing a centralized platform, we empower students to take
              an active role in their academic and extracurricular journey.
            </p>
            <p className="text-lg text-gray-600">
              Join us in building a vibrant, collaborative community at KLS GIT.
            </p>
          </div>
          <Image
            src="/img/studentss.jpg" // Replace with actual image path
            alt="Our Story"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </section>

        {/* Services Section */}
        <section className="mb-20 mt-20 text-center">
          <h2 className="mb-8 text-3xl font-bold">Our Services</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Event Management
              </h3>
              <p className="text-gray-600">
                Clubs can post events and manage their schedules effortlessly.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Activity Points
              </h3>
              <p className="text-gray-600">
                Students earn activity points for participating in events,
                motivating greater involvement.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Certification
              </h3>
              <p className="text-gray-600">
                Participants receive certificates as recognition for their
                contributions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;