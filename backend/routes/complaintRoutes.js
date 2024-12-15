const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");

// <======== Create Complaint =========>
router.post("/", async (req, res) => {
  const { title, description, category, priority } = req.body;
  try {
    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      status: "Pending",
      dateSubmitted: new Date(),
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint created successfully", complaint });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating complaint", error: error.message });
  }
});

// <======== Get all Complaints =========>
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching complaints", error: error.message });
  }
});

// <========== Update Complaint ===========>
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating complaint", error: error.message });
  }
});

// <========== Delete Complaint ===========>
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting complaint", error: error.message });
  }
});

module.exports = router;
