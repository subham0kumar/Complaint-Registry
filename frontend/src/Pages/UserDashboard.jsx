import React from "react";
import ComplaintForm from "../Components/ComplaintForm";
import UserComplaintTable from "../Components/UserComplaintTable";
const UserDashboard = ({ isAdmin }) => {
  return (
    <div
      className={`${isAdmin ? "hidden" : "bg-white rounded-lg shadow-sm p-6"}`}
    >
      <ComplaintForm />
      <UserComplaintTable />
    </div>
  );
};

export default UserDashboard;
