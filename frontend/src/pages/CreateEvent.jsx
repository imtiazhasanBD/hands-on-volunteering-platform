import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/create",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Event Created Successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        capacity: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event.");
    }
  };

  // Get today's date in YYYY-MM-DD format (required for the `min` attribute)
  const today = new Date().toISOString().split("T")[0];
  console.log(formData);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Volunteer Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              min={today}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Event Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="number"
              name="capacity"
              placeholder="Event Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <Button type="submit">Create Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
