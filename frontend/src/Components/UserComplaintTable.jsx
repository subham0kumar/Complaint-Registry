import React, { useEffect, useState } from "react";
import API from "../api/api";

const UserComplaintTable = () => {
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

  useEffect(() => {
    fetchComplaints();
  }, [complaints]);

  const filteredComplaints = complaints.filter((complaint) =>
    filter ? complaint.status === filter : true
  );

  return (
    <div className="flex flex-col gap-5 items-between justify-start mt-24">
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
        <div className="hidden md:flex w-full justify-center">
          <table className="bg-gray-50">
            <tr className="font-bold text-left px-4 flex items-center justify-around w-full border">
              <th className={catStyles}>Title</th>
              <th className={catStyles}>Category</th>
              <th className={catStyles}>Priority</th>
              <th className={catStyles}>Status</th>
            </tr>

            <tbody className="flex w-full flex-col bg-white divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {complaint.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {complaint.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : complaint.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
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
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    complaint.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : complaint.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserComplaintTable;
