import React, { useState } from "react";

// Define an interface for event data
interface EventData {
  title: string;
  tagline?: string;
  deadline: string;
  imageUrl: string;
  description: string;
  contact: string;
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
          <img src={data.imageUrl} alt={data.title} />
        </figure>
        <div className="card-body justify-center items-center">
          <h2 className="card-title">{data.title}</h2>
          <p>{data.tagline}</p>
          <p>Deadline: {data.deadline}</p>
          <div className="card-actions justify-between mt-4">
            <button onClick={toggleDialog} className="btn btn-secondary">
              View Details
            </button>
            <button className="btn btn-primary">Register</button>
          </div>
        </div>
      </div>

      {/* Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg">
            <div className="flex">
              <div className="w-1/3 pr-4">
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="rounded-lg"
                />
              </div>
              <div className="w-2/3 pl-4">
                <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
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
