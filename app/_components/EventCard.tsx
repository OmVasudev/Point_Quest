"use client";
import React, { useState } from "react";
import Link from "next/link";

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
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={data.image} alt={data.name} />
        </figure>
        <div className="card-body justify-center items-start">
          <h2 className="card-title font-redressed">{data.name}</h2>
          <p>{data.contact}</p>
          <p>
            <strong>Deadline:</strong> {data.date}
          </p>
          <p>
            <strong>Activity Points:</strong> {data.points}
          </p>
        </div>
        <div className="card-actions pb-6 px-8 justify-between items-center mt-4">
          <button onClick={toggleDialog} className="btn btn-secondary">
            View Details
          </button>
          <button className="btn btn-primary">
            <Link
              href="https://www.figma.com/design/255s4cOaOP90UfEr6Vxy5D/Mini-Project?node-id=278-3130&node-type=canvas&t=Igb7MLUALNQ7SDml-0"
              target="blank"
            >
              Register
            </Link>
          </button>
        </div>
      </div>

      {/* Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg">
            <div className="flex">
              <div className="w-1/3 pr-4">
                <img src={data.image} alt={data.name} className="rounded-lg" />
                <div className="mt-4 p-4 flex flex-col rounded-lg  justify-center items-center bg-secondary-100">
                  <h1 className="text-xl font-bold">Activity Points</h1>{" "}
                  <div className="text-4xl font-bold font-redressed py-4">
                    {data.points}
                  </div>
                </div>
              </div>

              <div className="w-2/3 pl-4">
                <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
                <p className="mb-4">{data.description}</p>
                <p className="text-sm font-medium">
                  <strong>Contact:</strong> {data.contact}
                </p>
                <div className="flex justify-end mt-6 space-x-4">
                  <button onClick={toggleDialog} className="btn btn-secondary">
                    Close
                  </button>
                  <button className="btn btn-primary">Register</button>
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
