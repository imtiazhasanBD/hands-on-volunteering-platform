const express = require("express");
const HelpRequest = require("../models/HelpRequest");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Help Request (Only Logged-in Users Can Post)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, urgency } = req.body;

    const newRequest = new HelpRequest({
      title,
      description,
      urgency: urgency.charAt(0).toUpperCase() + urgency.slice(1), // "Low", "Medium" "Urgent"
      createdBy: req.user.id,
    });

    await newRequest.save();
    res.status(201).json({ message: "Help request posted successfully", request: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Error posting help request", error });
  }
});

//Get All Help Requests (Publicly Available)
router.get("/", async (req, res) => {
  try {
    const { urgency } = req.query;
    let filter = {};

    if (urgency) {
      filter.urgency = urgency;
    }

    const requests = await HelpRequest.find(filter).populate("createdBy", "name email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching help requests", error });
  }
});

//Offer Help (Users Can Comment Their Help Intentions)
router.post("/offer/:requestId", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const request = await HelpRequest.findById(req.params.requestId);

    if (!request) return res.status(404).json({ message: "Help request not found" });

    request.comments.push({ user: req.user.id, message });
    await request.save();
    res.json({ message: "Help offer posted successfully", request });
  } catch (error) {
    res.status(500).json({ message: "Error offering help", error });
  }
});

//Get Help Request with Comments
router.get("/:requestId", async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.requestId).populate("comments.user", "name email");
    if (!request) return res.status(404).json({ message: "Help request not found" });
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Error fetching help request", error });
  }
});

//Get My Help Requests (Only Logged-in Users)
router.get("/my-requests", authMiddleware, async (req, res) => {
  try {
    const myRequests = await HelpRequest.find({ createdBy: req.user.id }).populate("createdBy", "name email");
    res.json(myRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your help requests", error });
  }
});

module.exports = router;