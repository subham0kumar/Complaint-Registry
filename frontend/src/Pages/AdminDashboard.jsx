import React from "react";
import ComplaintForm from "../Components/ComplaintForm";
import ComplaintTable from "../Components/ComplaintTable";

const AdminDashboard = ({ isAdmin }) => {
  return (
    <div className={`${isAdmin ? "bg-white rounded-lg shadow-sm p-6" : "hidden"}`}>
      <ComplaintTable />
    </div>
  );
};

export default AdminDashboard;
