import React, { useEffect, useState } from "react";
import API from "../api/api";
import { MdDeleteForever } from "react-icons/md";

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("");

  const catStyles =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";

  const fetchComplaints = async () => {
    try {
      const response = await API.get("/");
      setComplaints(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/${id}`, { status });
      alert("Status updated successfully!");
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await API.delete(`/${id}`);
      alert("Complaint deleted successfully!");
      fetchComplaints();
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [complaints]);

  const filteredComplaints = complaints.filter((complaint) =>
    filter ? complaint.status === filter : true
  );

  return (
    <div className="flex flex-col gap-5 items-between justify-start mt-6">
      <h2 className="text-2xl">Complaints</h2>
      <hr className="w-full" />
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="bg-gray-200 border-2 rounded-md border-blue-300 border-opacity-50 p-2 outline-none"
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
      <div className="overflow-hidden">
        <div className="hidden w-full md:flex justify-center">
          <table className="bg-gray-200">
            <tr className="font-bold text-left px-4 flex items-center justify-around w-full border">
              <th className={catStyles}>Title</th>
              <th className={catStyles}>Category</th>
              <th className={catStyles}>Priority</th>
              <th className={catStyles}>Status</th>
              <th className={catStyles}>Actions</th>
            </tr>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="px-4 flex items-center justify-around w-full border"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {complaint.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {complaint.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        complaint.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : complaint.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      className="px-3 py-1 bg-[#F8F9FC] border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(complaint._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      onClick={() => deleteComplaint(complaint._id)}
                    >
                      <MdDeleteForever className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{complaint.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Category: {complaint.category}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    complaint.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : complaint.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {complaint.priority}
                </span>
                <span className="py-3 px-4">
                  <select
                    className="px-3 py-1 bg-[#F8F9FC] border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                    value={complaint.status}
                    onChange={(e) =>
                      updateStatus(complaint._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </span>
                <span>
                  <button
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => deleteComplaint(complaint._id)}
                  >
                    <MdDeleteForever className="h-4 w-4" />
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplaintTable;
