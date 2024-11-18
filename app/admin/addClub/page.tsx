"use client";

import React, { useState, useEffect } from "react";
import { addClub, getClubs, updateClub } from "@/app/_lib/data-service";

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState("add"); // 'add' or 'edit'
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubData, setClubData] = useState({
    id: 0,
    name: "",
    faculty: "",
    president: "",
    techLead: "",
    image: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const data = await getClubs();
      setClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const handleOpenForm = (type: "add" | "edit", club = null) => {
    setFormType(type);
    setSelectedClub(club);
    setFormVisible(true);
    if (club) {
      setClubData({ ...club });
    } else {
      setClubData({
        id: 0,
        name: "",
        faculty: "",
        president: "",
        techLead: "",
        image: "",
        category: "",
      });
    }
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClubData({ ...clubData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (formType === "add") {
        await addClub(clubData);
        setMessage("Club added successfully!");
      } else if (formType === "edit") {
        await updateClub(clubData.id, clubData);
        setMessage("Club updated successfully!");
      }
      await fetchClubs();
      handleCloseForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to process the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 pb-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Clubs Management
      </h1>

      <button
        className="mb-6 px-6 py-3 bg-gradient-to-t from-blue-700 to-cyan-500 text-white rounded-lg"
        onClick={() => handleOpenForm("add")}
      >
        Add New Club
      </button>

      {message && <p className="text-center text-green-600 my-4">{message}</p>}

      {/* Clubs Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-900 text-white text-center">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Faculty</th>
                <th className="px-4 py-3 font-semibold">President</th>
                <th className="px-4 py-3 font-semibold">Tech Lead</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club) => (
                <tr key={club.id} className="text-center border-t">
                  <td className="text-black px-4 py-3">{club.id}</td>
                  <td className="text-black px-4 py-3">{club.name}</td>
                  <td className="text-black px-4 py-3">{club.faculty}</td>
                  <td className="text-black px-4 py-3">{club.president}</td>
                  <td className="text-black px-4 py-3">{club.techLead}</td>
                  <td className="text-black px-4 py-3">{club.category}</td>
                  <td className="text-black px-4 py-3">
                    <button
                      className="px-4 py-2  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => handleOpenForm("edit", club)}
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
          <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {formType === "add" ? "Add New Club" : "Edit Club"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                name="id"
                value={clubData.id}
                onChange={handleChange}
                placeholder="Club ID"
                required
                disabled={formType === "edit"}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="name"
                value={clubData.name}
                onChange={handleChange}
                placeholder="Club Name"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="faculty"
                value={clubData.faculty}
                onChange={handleChange}
                placeholder="Faculty"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="president"
                value={clubData.president}
                onChange={handleChange}
                placeholder="President"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="techLead"
                value={clubData.techLead}
                onChange={handleChange}
                placeholder="Tech Lead"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="image"
                value={clubData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="category"
                value={clubData.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 text-white font-bold rounded-lg ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Processing..."
                  : formType === "add"
                  ? "Add Club"
                  : "Update Club"}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg"
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

export default ClubsPage;
