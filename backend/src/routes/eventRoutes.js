const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const { getEventsByAttendee } = require("../controllers/eventController");

const router = express.Router();

// Create Event (Only Logged-in Users Can Create)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, time, location, category, capacity } =
      req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      capacity,
      createdBy: req.user.id,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

// Get All Events (Public Feed)
router.get("/", async (req, res) => {
  try {
    const { category, location, date, availability, page = 1, limit = 10, type } = req.query;
    const currentDate = new Date(); // Get the current date and time

    let filter = {};

    // Filter by event type (upcoming or past)
    if (type === "upcoming") {
      filter.date = { $gte: currentDate }; // Upcoming events
    } else if (type === "past") {
      filter.date = { $lt: currentDate }; // Past events
    }

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
      // Apply date filter within the context of the selected tab
      if (type === "upcoming") {
        filter.date.$gte = new Date(date); // Filter upcoming events from the specified date
      } else if (type === "past") {
        filter.date.$lt = new Date(date); // Filter past events before the specified date
      }
    }

    // Filtering by availability (if provided)
    if (availability) {
      if (availability === "available") {
        filter.$expr = { $lt: [{ $size: "$attendees" }, "$capacity"] }; // Available spots
      } else if (availability === "full") {
        filter.$expr = { $gte: [{ $size: "$attendees" }, "$capacity"] }; // Full events
      }
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch events
    const events = await Event.find(filter)
      .sort({ date: type === "upcoming" ? 1 : -1 }) // Sort by date (ascending for upcoming, descending for past)
      .skip(skip)
      .limit(parseInt(limit));

    // Count total events for pagination
    const totalEvents = await Event.countDocuments(filter);

    res.status(200).json({
      events,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Join Event (User Clicks "Join")
router.post("/:eventId/join", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if the user is the organizer
    if (event.createdBy.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "You cannot join your own event", cause: "own" });
    }
    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
      return res.json({ message: "Joined event successfully", event });
    } else {
      return res
        .status(400)
        .json({ message: "Already joined this event", cause: "joined" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error joining event", error });
  }
});

//Get My Events (Only Events Created by Logged-in User)
router.get("/my-events", authMiddleware, async (req, res) => {
  try {
    const myEvents = await Event.find({ createdBy: req.user.id }).populate(
      "createdBy",
      "name email"
    );
    res.json(myEvents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user events", error });
  }
});

router.get("/attended-events", authMiddleware, getEventsByAttendee);

module.exports = router;
