import React, { useState } from "react";
import { getStudentByUsn, updateStudent } from "./data-services";

const Page: React.FC = () => {
  const [usn, setUsn] = useState("");
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Fetch the student by USN
      const student = await getStudentByUsn(usn);

      if (!student) {
        setError("Student not found.");
        setLoading(false);
        return;
      }

      // Calculate updated points
      const updatedPoints = student.points + points;

      // Update the student data
      await updateStudent({ id: student.id, points: updatedPoints });

      setSuccess("Points updated successfully.");
    } catch (err: any) {
      setError("An error occurred while updating points.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">Update Student Points</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="space-y-4"
      >
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
            onChange={(e) => setUsn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="points"
            className="block text-sm font-medium text-gray-700"
          >
            Points
          </label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </div>
  );
};

export default Page;
