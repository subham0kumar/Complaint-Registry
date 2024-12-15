import { useState } from "react";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";

function App() {
  const [userType, setUserType] = useState("ADMIN");
  const [isAdmin, setIsAdmin] = useState(true);
  const handleChange = (e) => {
    setUserType(e.target.value);
    setIsAdmin(e.target.value === "ADMIN");
  };
  return (
    <>
      {/* {console.log(userType, isAdmin)} */}
      <div className="bg-gray-100 min-h-screen w-screen md:w-[75dvw] flex flex-col justify-start p-6 md:p-16 items-center">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl mb-4">Complaint Management System</h1>
          <hr />
          <span className="flex gap-5 items-center justify-center">
            <label>
              <input
                type="radio"
                name="type"
                value="USER"
                checked={userType === "USER"}
                onChange={handleChange}
              />
              USER
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="ADMIN"
                checked={userType === "ADMIN"}
                onChange={handleChange}
              />
              ADMIN
            </label>
          </span>
        </div>
        <span className="w-full mt-8">
          <AdminDashboard isAdmin={isAdmin} />
          <UserDashboard isAdmin={isAdmin} />
        </span>
      </div>
    </>
  );
}

export default App;
