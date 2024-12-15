import React, { useState } from "react";
import API from "../api/api";

const ComplaintForm = () => {
  const inputStyles =
    "bg-gray-200 border-2 rounded-md border-blue-300 border-opacity-50 w-full p-2 outline-none";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/", formData);
      alert("Complaint submitted successfully!");
      setFormData({
        title: "",
        description: "",
        category: "Product",
        priority: "Low",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl">Submit a Complaint</h2>
      <hr className="w-full" />
      <span className="md:my-4 flex flex-col md:flex-row md:gap-10 gap-2">
        <label className="w-1/3" htmlFor="title">Complaint Title: </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Type here..."
          required
          className={`text-lg ${inputStyles}`}
        />
      </span>
      <span className="md:my-4 flex flex-col md:flex-row md:gap-10 gap-2">
        <label className="w-1/3" htmlFor="description">Description: </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Desicribe in details..."
          required
          className={`${inputStyles}`}
        />
      </span>
      <span className="md:my-4 flex flex-col  md:flex-row md:gap-10 gap-2">
        <label className="w-1/3" htmlFor="category">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`${inputStyles}`}
        >
          <option value="Product">Product</option>
          <option value="Service">Service</option>
          <option value="Support">Support</option>
        </select>
      </span>
      <div className="md:my-4 flex flex-col md:flex-row md:gap-10 gap-4 w-full">
        <label className="w-1/3" htmlFor="priority">Priority: </label>
        <span
          id="priority"
          className="flex flex-col items-start md:flex-row md:justify-around md:w-full ml-10 justify-around"
        >
          <label>
            <input
              type="radio"
              name="priority"
              value="Low"
              checked={formData.priority === "Low"}
              onChange={handleChange}
              className="mr-2"
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="Medium"
              checked={formData.priority === "Medium"}
              onChange={handleChange}
              className="mr-2"
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="High"
              checked={formData.priority === "High"}
              onChange={handleChange}
              className="mr-2"
            />
            High
          </label>
        </span>
      </div>
      <span className="w-full flex justify-center">
        <button
          className="w-1/2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </span>
      <hr className="w-full" />
    </form>
  );
};

export default ComplaintForm;
