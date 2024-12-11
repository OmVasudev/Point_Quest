// "use client";

// import { useState, useEffect } from "react";
// import {
//   addEvent,
//   updateEvent,
//   getEvents,
//   getClubNames,
// } from "@/app/_lib/data-service"; // Adjust the path based on your project structure

// const EventPage = () => {
//   const [events, setEvents] = useState([]);
//   const [clubNames, setClubNames] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [formType, setFormType] = useState("add"); // 'add' or 'edit'
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [eventData, setEventData] = useState({
//     id: 0,
//     name: "",
//     description: "",
//     contact: "",
//     link: "",
//     points: 0,
//     image: "",
//     clubId: 0,
//     isCompleted: false,
//     date: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchEvents();
//     fetchClubNames();
//   }, []);

//   const fetchClubNames = async () => {
//     try {
//       const data = await getClubNames();
//       setClubNames(data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const data = await getEvents();
//       setEvents(data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const handleOpenForm = (type: "add" | "edit", event = null) => {
//     setFormType(type);
//     setSelectedEvent(event);
//     setFormVisible(true);
//     if (event) {
//       setEventData({ ...event });
//     } else {
//       setEventData({
//         id: 0,
//         name: "",
//         description: "",
//         contact: "",
//         link: "",
//         points: 0,
//         image: "",
//         clubId: 0,
//         isCompleted: false,
//         date: "",
//       });
//     }
//   };

//   const handleCloseForm = () => {
//     setFormVisible(false);
//     setMessage("");
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value, type, checked } = e.target;
//     setEventData({
//       ...eventData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       if (formType === "add") {
//         await addEvent(eventData);
//         setMessage("Event added successfully!");
//       } else if (formType === "edit") {
//         await updateEvent(eventData.id, eventData);
//         setMessage("Event updated successfully!");
//       }
//       await fetchEvents();
//       handleCloseForm();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setMessage("Failed to process the request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto mt-8 max-w-7xl px-4 pb-6">
//       <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
//         Event Management
//       </h1>

//       <button
//         className="mb-6 rounded-lg bg-gradient-to-t from-blue-700 to-cyan-500 px-6 py-3 text-white"
//         onClick={() => handleOpenForm("add")}
//       >
//         Add New Event
//       </button>

//       {message && <p className="my-4 text-center text-green-600">{message}</p>}

//       {/* Events Table */}
//       <div className="rounded-2xl bg-white p-6 shadow-lg">
//         <div className="overflow-x-auto rounded-lg">
//           <table className="min-w-full table-auto">
//             <thead>
//               <tr className="bg-blue-900 text-center text-white">
//                 <th className="px-4 py-3 font-semibold">ID</th>
//                 <th className="px-4 py-3 font-semibold">Name</th>
//                 <th className="px-4 py-3 font-semibold">Contact</th>
//                 <th className="px-4 py-3 font-semibold">Points</th>
//                 <th className="px-4 py-3 font-semibold">Date</th>
//                 <th className="px-4 py-3 font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event) => (
//                 <tr key={event.id} className="border-t text-center">
//                   <td className="px-4 py-3 text-black">{event.id}</td>
//                   <td className="px-4 py-3 text-black">{event.name}</td>
//                   <td className="px-4 py-3 text-black">{event.contact}</td>
//                   <td className="px-4 py-3 text-black">{event.points}</td>
//                   <td className="px-4 py-3 text-black">{event.date}</td>
//                   <td className="px-4 py-3 text-black">
//                     <button
//                       className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
//                       onClick={() => handleOpenForm("edit", event)}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Form Modal */}
//       {formVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-160 rounded-2xl bg-white p-8 shadow-lg">
//             <h2 className="mb-4 text-xl font-bold text-gray-800">
//               {formType === "add" ? "Add New Event" : "Edit Event"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Row 1 - Two input fields in a row */}
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="number"
//                   name="id"
//                   value={eventData.id}
//                   onChange={handleChange}
//                   placeholder="Event ID"
//                   required
//                   disabled={formType === "edit"}
//                   className="w-full rounded-lg border px-4 py-2"
//                 />
//                 <input
//                   type="text"
//                   name="name"
//                   value={eventData.name}
//                   onChange={handleChange}
//                   placeholder="Event Name"
//                   required
//                   className="w-full rounded-lg border px-4 py-2"
//                 />
//               </div>

//               {/* Row 2 - Two input fields in a row */}
//               <div className="grid grid-cols-2 gap-4">
//                 <textarea
//                   name="description"
//                   value={eventData.description}
//                   onChange={handleChange}
//                   placeholder="Event Description"
//                   required
//                   className="w-full rounded-lg border px-4 py-2"
//                 />
//                 <input
//                   type="text"
//                   name="contact"
//                   value={eventData.contact}
//                   onChange={handleChange}
//                   placeholder="Contact"
//                   required
//                   className="w-full rounded-lg border px-4 py-2"
//                 />
//               </div>

//               {/* Row 3 - Two input fields in a row */}
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="url"
//                   name="link"
//                   value={eventData.link}
//                   onChange={handleChange}
//                   placeholder="Event Link"
//                   className="w-full rounded-lg border px-4 py-2"
//                 />
//                 <input
//                   type="number"
//                   name="points"
//                   value={eventData.points}
//                   onChange={handleChange}
//                   placeholder="Points"
//                   required
//                   className="w-full rounded-lg border px-4 py-2"
//                 />
//               </div>

//               {/* Row 4 - One input field (Image URL) */}
//               <input
//                 type="text"
//                 name="image"
//                 value={eventData.image}
//                 onChange={handleChange}
//                 placeholder="Image URL"
//                 className="w-full rounded-lg border px-4 py-2"
//               />

//               {/* Row 5 - Club Select and Completed Checkbox */}
//               <div className="grid grid-cols-2 gap-4">
//                 <select
//                   name="clubId"
//                   value={eventData.clubId}
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-lg border px-4 py-2"
//                 >
//                   {/* Dynamically populate the clubs */}
//                   {clubNames.map((club) => (
//                     <option key={club.id} value={club.id}>
//                       {club.name}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="isCompleted"
//                     checked={eventData.isCompleted}
//                     onChange={handleChange}
//                     className="h-5 w-5 text-blue-600"
//                   />
//                   <label className="ml-2 text-gray-600">Completed</label>
//                 </div>
//               </div>

//               {/* Row 6 - Date input */}
//               <input
//                 type="date"
//                 name="date"
//                 value={eventData.date}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-lg border px-4 py-2"
//               />

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full rounded-lg px-4 py-2 font-bold text-white ${
//                   loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {loading
//                   ? "Processing..."
//                   : formType === "add"
//                     ? "Add Event"
//                     : "Update Event"}
//               </button>

//               {/* Cancel Button */}
//               <button
//                 type="button"
//                 className="mt-2 w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
//                 onClick={handleCloseForm}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventPage;

"use client";

import { useState, useEffect } from "react";
import {
  addEvent,
  updateEvent,
  getEvents,
  getClubNames,
} from "@/app/_lib/data-service"; // Adjust the path based on your project structure

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [clubNames, setClubNames] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState("add"); // 'add' or 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    contact: "",
    link: "",
    points: 0,
    image: "",
    clubId: 0,
    isCompleted: false,
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvents();
    fetchClubNames();
  }, []);

  const fetchClubNames = async () => {
    try {
      const data = await getClubNames();
      setClubNames(data);
    } catch (error) {
      console.error("Error fetching club names:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleOpenForm = (type: "add" | "edit", event = null) => {
    setFormType(type);
    setSelectedEvent(event);
    setFormVisible(true);
    if (event) {
      setEventData({ ...event });
    } else {
      setEventData({
        name: "",
        description: "",
        contact: "",
        link: "",
        points: 0,
        image: "",
        clubId: 0,
        isCompleted: false,
        date: "",
      });
    }
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setMessage("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Event Management
      </h1>

      <button
        className="mb-6 rounded-lg bg-gradient-to-t from-blue-700 to-cyan-500 px-6 py-3 text-white"
        onClick={() => handleOpenForm("add")}
      >
        Add New Event
      </button>

      {message && <p className="my-4 text-center text-green-600">{message}</p>}

      {/* Events Table */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-900 text-center text-white">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Points</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t text-center">
                  <td className="px-4 py-3 text-black">{event.name}</td>
                  <td className="px-4 py-3 text-black">{event.contact}</td>
                  <td className="px-4 py-3 text-black">{event.points}</td>
                  <td className="px-4 py-3 text-black">{event.date}</td>
                  <td className="px-4 py-3 text-black">
                    <button
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
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

      {/* Form Modal */}
      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-160 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              {formType === "add" ? "Add New Event" : "Edit Event"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1 - Event Name */}
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                placeholder="Event Name"
                required
                className="w-full rounded-lg border px-4 py-2"
              />

              {/* Row 2 - Description and Contact */}
              <div className="grid grid-cols-2 gap-4">
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  placeholder="Event Description"
                  required
                  className="w-full rounded-lg border px-4 py-2"
                />
                <input
                  type="text"
                  name="contact"
                  value={eventData.contact}
                  onChange={handleChange}
                  placeholder="Contact"
                  required
                  className="w-full rounded-lg border px-4 py-2"
                />
              </div>

              {/* Row 3 - Link and Points */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="url"
                  name="link"
                  value={eventData.link}
                  onChange={handleChange}
                  placeholder="Event Link"
                  className="w-full rounded-lg border px-4 py-2"
                />
                <input
                  type="number"
                  name="points"
                  value={eventData.points}
                  onChange={handleChange}
                  placeholder="Points"
                  required
                  className="w-full rounded-lg border px-4 py-2"
                />
              </div>

              {/* Row 4 - Image URL */}
              <input
                type="text"
                name="image"
                value={eventData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full rounded-lg border px-4 py-2"
              />

              {/* Row 5 - Club Select and Completed Checkbox */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="clubId"
                  value={eventData.clubId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-2"
                >
                  <option value="" disabled>
                    Select Club
                  </option>
                  {clubNames.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isCompleted"
                    checked={eventData.isCompleted}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <label className="ml-2 text-gray-600">Completed</label>
                </div>
              </div>

              {/* Row 6 - Date Input */}
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2"
              />

              {/* Submit and Cancel Buttons */}
              <button
                type="submit"
                disabled={loading}
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
              <button
                type="button"
                className="mt-2 w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
                onClick={handleCloseForm}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
