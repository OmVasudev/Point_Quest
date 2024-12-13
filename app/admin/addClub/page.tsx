"use client";

import React, { useState, useEffect } from "react";
import { addClub, getClubs, updateClub } from "@/app/_lib/data-service";
import { CldUploadWidget } from "next-cloudinary"; // Cloudinary widget import

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState("add"); // 'add' or 'edit'
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubData, setClubData] = useState({
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

  const handleOpenForm = (type, club = null) => {
    setFormType(type);
    setSelectedClub(club);
    setFormVisible(true);
    if (club) {
      setClubData({ ...club });
    } else {
      setClubData({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData({ ...clubData, [name]: value });
  };

  const handleImageUpload = (info) => {
    const { secure_url } = info;
    setClubData((prev) => ({ ...prev, image: secure_url })); // Set the image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (formType === "add") {
        await addClub(clubData);
        setMessage("Club added successfully!");
      } else if (formType === "edit") {
        await updateClub(selectedClub.id, clubData);
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
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Clubs Management
      </h1>

      <button
        className="mb-6 rounded-lg bg-gradient-to-t from-blue-700 to-cyan-500 px-6 py-3 text-white"
        onClick={() => handleOpenForm("add")}
      >
        Add New Club
      </button>

      {message && <p className="my-4 text-center text-green-600">{message}</p>}

      {/* Clubs Table */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-900 text-center text-white">
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
                <tr key={club.id} className="border-t text-center">
                  <td className="px-4 py-3 text-black">{club.name}</td>
                  <td className="px-4 py-3 text-black">{club.faculty}</td>
                  <td className="px-4 py-3 text-black">{club.president}</td>
                  <td className="px-4 py-3 text-black">{club.techLead}</td>
                  <td className="px-4 py-3 text-black">{club.category}</td>
                  <td className="px-4 py-3 text-black">
                    <button
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
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
          <div className="w-1/3 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
              {formType === "add" ? "Add New Club" : "Edit Club"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={clubData.name}
                onChange={handleChange}
                placeholder="Club Name"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />
              <input
                type="text"
                name="faculty"
                value={clubData.faculty}
                onChange={handleChange}
                placeholder="Faculty"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />
              <input
                type="text"
                name="president"
                value={clubData.president}
                onChange={handleChange}
                placeholder="President"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />
              <input
                type="text"
                name="techLead"
                value={clubData.techLead}
                onChange={handleChange}
                placeholder="Tech Lead"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              <input
                type="text"
                name="category"
                value={clubData.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full rounded-lg border bg-white px-4 py-2 text-gray-700"
              />

              {/* Cloudinary Image Upload Widget */}
              <div className="my-4">
                <CldUploadWidget
                  uploadPreset="cgwiy7po" // Replace with your Cloudinary preset
                  onSuccess={({ info }) => handleImageUpload(info)} // Handle the image upload success
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Upload Club Image
                    </button>
                  )}
                </CldUploadWidget>
              </div>

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
                    ? "Add Club"
                    : "Update Club"}
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

export default ClubsPage;
