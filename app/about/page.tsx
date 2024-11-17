import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="bg-white">
      <main className=" mx-auto py-12 px-12">
        {/* About Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            Centralized Platform for Clubs
          </p>
        </section>

        {/* Mission Section */}
        <section className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <Image
            src="/img/header-image.jpeg" // Replace with actual path to the image
            alt="Team Mission"
            width={500}
            height={300}
            className="rounded-md shadow-md"
          />
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Our Mission: Helping Students of KLS GIT Grow Better
            </h2>
            <p className="text-gray-600">
              We're building a platform to revolutionize club management at KLS
              GIT. Our goal is to simplify event organization, enhance
              communication, and streamline administrative tasks. By providing a
              unified and accessible solution, we aim to empower both students
              and club organizers
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              We envision a future where club activities at KLS GIT are more
              efficient, engaging, and impactful. By providing a centralized
              platform, we're empowering students to actively participate in
              their academic journey.
            </p>
            <p className="text-gray-600">
              Join us in building a better future for KLS GIT.
            </p>
          </div>
          <Image
            src="/img/header-image.jpeg" // Replace with actual path to the image
            alt="Story Image"
            width={500}
            height={300}
            className="rounded-md shadow-md"
          />
        </section>

        {/* <section className="text-center">
          <h2 className="text-2xl font-bold mb-8">HubSpot By the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">12 Global Offices</h3>
              <a href="#" className="text-blue-500 underline">
                Learn more
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">7,600+ Employees</h3>
              <a href="#" className="text-blue-500 underline">
                Learn more
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">205,000+ Customers</h3>
              <a href="#" className="text-blue-500 underline">
                Learn more
              </a>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default Page;
