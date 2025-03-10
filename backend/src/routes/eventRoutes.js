const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

// Create Event (Only Logged-in Users Can Create)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      createdBy: req.user.id, 
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

// Get All Events (Public Feed)
router.get("/", async (req, res) => {
  try {
      const { category, location, date } = req.query;
      let filter = {};

      // Filtering by category (if provided)
      if (category) {
          filter.category = { $regex: new RegExp(category, "i") }; // Case-insensitive search
      }

      // Filtering by location (if provided)
      if (location) {
          filter.location = { $regex: new RegExp(location, "i") };
      }

      // Filtering by date (if provided)
      if (date) {
          filter.date = { $gte: new Date(date) }; // Fetch events from this date onwards
      }

      // Fetch events with filtering (sorted by newest events first)
      const events = await Event.find(filter).sort({ date: 1 });

      res.status(200).json(events);
  } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Server error" });
  }
})

// Join Event (User Clicks "Join")
router.post("/join/:eventId", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
      return res.json({ message: "Joined event successfully", event });
    } else {
      return res.status(400).json({ message: "Already joined this event" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error joining event", error });
  }
});

//Get My Events (Only Events Created by Logged-in User)
router.get("/my-events", authMiddleware, async (req, res) => {
  try {
    const myEvents = await Event.find({ createdBy: req.user.id }).populate("createdBy", "name email");
    res.json(myEvents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user events", error });
  }
});

module.exports = router;