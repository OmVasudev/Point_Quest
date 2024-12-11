"use client";

import React, { useEffect, useState } from "react";
import {
  findStudent,
  findBod,
  findAdmin,
  getClubByBod,
  getEventByClub,
  addParticipatedStudent,
  addParticipatedBod,
  addParticipatedAdmin,
} from "@/app/_lib/data-service";
import { getSession } from "next-auth/react";

const Page: React.FC = () => {
  const [usn, setUsn] = useState("");
  // const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [events, setEvents] = useState<{ id: number; name: string }[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [validUser, setValidUser] = useState<boolean>(false); // Tracks if USN is valid

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get session and fetch events if the user is a BOD
        const session = await getSession();
        if (!session || !session.user || !session.user.id) {
          setError("Session or bodId not found.");
          return;
        }

        const bodIdFromSession = session.user.id;

        // Fetch club by bodId
        const clubData = await getClubByBod(Number(bodIdFromSession));
        if (!clubData || clubData.length === 0) {
          setError("No club found for the given bodId.");
          return;
        }

        // Fetch events by clubId
        const clubId = clubData[0].clubId;
        const eventData = await getEventByClub(clubId);
        setEvents(eventData || []);
      } catch (err) {
        setError("An error occurred while fetching events." + err);
      }
    };

    fetchEvents();
  }, []);

  const handleCheckUSN = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const student = await findStudent(usn);
      if (student) {
        setValidUser(true);
        setSuccess("USN belongs to a student.");
        return;
      }

      const bod = await findBod(usn);
      if (bod) {
        setValidUser(true);
        setSuccess("USN belongs to a BOD.");
        return;
      }

      const admin = await findAdmin(usn);
      if (admin) {
        setValidUser(true);
        setSuccess("USN belongs to an admin.");
        return;
      }

      setError("USN not found in Student, BOD, or Admin.");
    } catch (err) {
      setError("An error occurred while checking the USN." + err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!validUser) {
      setError("Please check the USN before updating.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!selectedEvent) {
        setError("Please select an event.");
        setLoading(false);
        return;
      }

      // Check the role and add the student, bod, or admin to the Participated table
      const student = await findStudent(usn);
      if (student) {
        const result = await addParticipatedStudent(student.id, selectedEvent);
        if (result) {
          setSuccess("Student added to the event successfully.");
        } else {
          setError("Failed to add student to the event.");
        }
        return;
      }

      const bod = await findBod(usn);
      if (bod) {
        const result = await addParticipatedBod(bod.id, selectedEvent);
        if (result) {
          setSuccess("BOD added to the event successfully.");
        } else {
          setError("Failed to add BOD to the event.");
        }
        return;
      }

      const admin = await findAdmin(usn);
      if (admin) {
        const result = await addParticipatedAdmin(admin.id, selectedEvent);
        if (result) {
          setSuccess("Admin added to the event successfully.");
        } else {
          setError("Failed to add admin to the event.");
        }
        return;
      }

      setError("USN not found in Student, BOD, or Admin.");
    } catch (err) {
      setError("An error occurred while adding the user to the event." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">Check USN and Add to Event</h1>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="usn"
            className="block text-sm font-medium text-gray-700"
          >
            USN
          </label>
          <input
            type="text"
            id="usn"
            value={usn}
            onChange={(e) => {
              setUsn(e.target.value);
              setValidUser(false); // Reset validUser on input change
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          onClick={handleCheckUSN}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check USN"}
        </button>
        {success && <p className="mt-4 text-green-500">{success}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {validUser && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="mt-4 space-y-4"
        >
          <div>
            <label
              htmlFor="event"
              className="block text-sm font-medium text-gray-700"
            >
              Event
            </label>
            <select
              id="event"
              value={selectedEvent || ""}
              onChange={(e) => setSelectedEvent(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select an event
              </option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Event"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
