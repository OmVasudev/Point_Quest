"use client";

import { useState, useEffect } from "react";
import { addEvent, updateEvent, getEvents } from "@/app/_lib/data-service";
import { CldUploadWidget } from "next-cloudinary";

const EventPage = ({ clubId, clubName }) => {
  const [events, setEvents] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    contact: "",
    link: "",
    driveLink: "",
    points: 0,
    image: "",
    clubId: clubId, // Directly use clubId from props
    isCompleted: false,
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [clubId]);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      const filteredEvents = data.filter((event) => event.clubId === clubId);
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleOpenForm = (type: "add" | "edit", event = null) => {
    setFormType(type);
    setSelectedEvent(event);
    setFormVisible(true);
    setEventData(
      event
        ? { ...event }
        : {
            name: "",
            description: "",
            contact: "",
            link: "",
            driveLink: "",
            points: 0,
            image: "",
            clubId: clubId, // Use clubId directly
            isCompleted: false,
            date: "",
          },
    );
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setMessage("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (info: any) => {
    const { secure_url } = info;
    setEventData((prev) => ({ ...prev, image: secure_url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (formType === "add") {
        await addEvent(eventData);
        setMessage("Event added successfully!");
      } else if (formType === "edit") {
        await updateEvent(selectedEvent.id, eventData);
        setMessage("Event updated successfully!");
      }
      await fetchEvents();
      handleCloseForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to process the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-6">
      <h1 className="mb-6 text-center font-primary text-4xl font-semibold text-gray-800">
        {clubName}
      </h1>
      <h1 className="text-center text-3xl font-semibold text-gray-800">
        Event Management
      </h1>

      <button
        className="mb-6 rounded-lg bg-gradient-to-t from-blue-700 to-cyan-500 px-5 py-2 text-white"
        onClick={() => handleOpenForm("add")}
      >
        Add New Event
      </button>

      {message && <p className="my-4 text-center text-green-600">{message}</p>}

      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-1/2 rounded-2xl bg-white p-8 shadow-lg">
            {/* Close Button */}
            <button
              onClick={handleCloseForm}
              className="absolute right-2 top-2 rounded-full bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="mb-5 text-center font-primary text-2xl font-bold text-gray-800">
              {formType === "add" ? "Add New Event" : "Edit Event"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                placeholder="Event Name"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                placeholder="Event Description"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <input
                type="text"
                name="contact"
                value={eventData.contact}
                onChange={handleChange}
                placeholder="Contact"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <input
                type="url"
                name="link"
                value={eventData.link}
                onChange={handleChange}
                placeholder="Event Link"
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <input
                type="url"
                name="driveLink"
                value={eventData.driveLink}
                onChange={handleChange}
                placeholder="Certificate Drive Link"
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <input
                type="number"
                name="points"
                value={eventData.points}
                onChange={handleChange}
                placeholder="Points"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                placeholder="Event Date"
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <div className="my-4">
                <CldUploadWidget
                  uploadPreset="cgwiy7po"
                  onSuccess={({ info }) => handleImageUpload(info)}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Add Event Banner
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <button
                type="submit"
                className={`w-full rounded-lg px-4 py-2 font-bold text-white ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Processing..."
                  : formType === "add"
                    ? "Add Event"
                    : "Update Event"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-3">
        <h2 className="mb-4 font-primary text-2xl font-bold text-black">
          Event List
        </h2>
        <table className="mb-8 w-full table-auto border-collapse border border-gray-300 text-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-600 px-4 py-2 text-lg font-extrabold">
                Name
              </th>
              <th className="border border-gray-600 px-4 py-2 text-lg font-extrabold">
                Contact
              </th>
              <th className="border border-gray-600 px-4 py-2 text-lg font-extrabold">
                Points
              </th>
              <th className="border border-gray-600 px-4 py-2 text-lg font-extrabold">
                Date
              </th>
              <th className="border border-gray-600 px-4 py-2 text-lg font-extrabold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border border-gray-600 px-4 py-2">
                  {event.name}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {event.contact || "N/A"}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {event.points || "N/A"}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {event.date || "N/A"}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  <button
                    className="rounded-lg bg-blue-500 px-4 py-1 text-white hover:bg-blue-700"
                    onClick={() => handleOpenForm("edit", event)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventPage;
