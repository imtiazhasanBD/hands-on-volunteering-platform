const Event = require("../models/Event");

const getEventsByAttendee = async (req, res) => {
  const userId = req.user.id;

  try {
    const events = await Event.find({ attendees: userId });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getEventsByAttendee };