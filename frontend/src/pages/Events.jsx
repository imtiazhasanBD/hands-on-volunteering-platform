import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { fetchEvents, joinEvent } from "@/utils/api";
import CustomPagination from "@/components/CustomPagination";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AvailabilityDropdown from "@/components/AvailabilityDropdown";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [activeTab, setActiveTab] = useState("upcoming"); // Track active tab
  const { user, setUser, token ,loading } = useAuth();
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    date: "",
    availability: "",
    page: 1,
    limit: 9,
  });

  console.log(totalEvents);

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents({ ...filters, type: activeTab });
        setEvents(data.events);
        setTotalPages(data.totalPages);
        setTotalEvents(data.totalEvents);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    getEvents();
  }, [filters, activeTab]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value === "all" ? "" : e.target.value,
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleRegister = async (eventId) => {
    const result = await joinEvent(eventId);
     toast.success(result.message);  
  };
  console.log(activeTab);

  if (!events || loading) return <p className="text-center">Loading...</p>;
  return (
    <div className="mx-auto  bg-white py-6 px-2 md:px-6 z-10">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-8">
        📅 Upcoming Volunteer Events
      </h1>

      {/* 🔍 Filters */}
      <div className="flex gap-4 mb-2 items-center overflow-x-auto">
        {/* Availability Dropdown */}
        <div className="">
          <AvailabilityDropdown
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>

        {/* Category Input */}
        <input
          name="category"
          type="text"
          placeholder="Filter by category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full min-w-[150px]"
          aria-label="Filter by category"
        />

        {/* Location Input */}
        <input
          name="location"
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full min-w-[150px]"
          aria-label="Filter by location"
        />

        {/* Date Input */}
        <input
          name="date"
          type="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full hidden"
          aria-label="Filter by date"
        />

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setFilters({
              availability: "",
              category: "",
              location: "",
              date: "",
            });
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded font-semibold text-xl"
          aria-label="Clear filters"
        >
          <MdOutlineFilterAltOff />
        </button> 
      </div>
      <Tabs defaultValue="upcoming" className="w-full md:w-2/5 my-4 ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="upcoming"
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" onClick={() => setActiveTab("past")}>
            Past Activities
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {/* 📌 Event List */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {events?.map((event) => (
            <Card key={event._id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>📍 Location:</strong> {event.location}
                </p>
                <p>
                  <strong>📅 Date & Time:</strong>{" "}
                  {new Date(event.date).toLocaleDateString() + " " + event.time}
                </p>
                <p>
                  <strong>📝 Description:</strong> {event.description}
                </p>
                <p>
                  <strong>🏷️ Category:</strong> {event.category}
                </p>
                <p>
                  <strong>Attendees:</strong>{" "}
                  {event.capacity + "/" + event.attendees.length}
                </p>
                {activeTab === "upcoming" && (
                  <div className="flex items-center text-center gap-2 text-green-500 font-semibold text-sm mt-4">
                    <Button
                      className=""
                      onClick={() => handleRegister(event._id)}
                      disabled={
                        event.createdBy === user?._id ||
                        event.attendees.includes(user?._id) ||
                        event.attendees.length >= event.capacity
                      }
                    >
                      Join Event
                    </Button>
                    <p className="text-center">
                      {(event.createdBy === user?._id && "Own Event") ||
                        (event.attendees.includes(user?._id) &&
                          "Already Joined")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No events found.</p>
      )}
      {totalEvents > 8 && (
        <div className="mt-8">
          {/* Your content */}
          <CustomPagination
            totalPages={totalPages}
            filters={filters}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default EventList;
