import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getProfile, getUserJoinedEvents, getVolunteerHistory, updateProfile } from "@/utils/api";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    causes: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((data) => {
          setUser(data);
          setFormData({
            name: data.name || "",
            skills: data.skills || "",
            causes: data.causes || "",
          });
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsFormChanged(true);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(token, formData);
      setUser(updatedUser);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
    setIsFormChanged(false);
  };

  useEffect(() => {
    if (token) {
      getUserJoinedEvents(token)
        .then((data) => {
          // Sort data by date in ascending order
          const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
          setVolunteerHistory(sortedData);
        })
        .catch((error) => console.error("Error fetching history:", error));
    }
  }, []);

  if (!user) return <p className="text-center">Loading...</p>;

  // Separate upcoming and past activities
  const currentDate = new Date();
  const upcomingActivities = volunteerHistory.filter((entry) => new Date(entry.date) >= currentDate);
  const pastActivities = volunteerHistory.filter((entry) => new Date(entry.date) < currentDate);
console.log(isFormChanged);


  return (
    <div className="max-w-[1400px] mx-auto  space-y-6">
      {/* Profile Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">👤 Profile</CardTitle>
          <CardDescription>Manage your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          {!editing ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">📧 {user.email}</p>
              </div>
              <div>
                <p className="text-gray-700">🎯 <span className="font-medium">Skills:</span> {user.skills?.join(", ") || "Not added"}</p>
                <p className="text-gray-700">🌍 <span className="font-medium">Causes:</span> {user.causes?.join(", ") || "Not added"}</p>
              </div>
              <Button className="mt-4" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Skills</Label>
              <Textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Causes</Label>
              <Textarea
                name="causes"
                value={formData.causes}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button className="mt-4" onClick={handleSave} disabled={!isFormChanged} >
                Save Changes
              </Button>
              <Button
                className="mt-4 bg-gray-500 hover:bg-gray-600"
                onClick={() => {
                  setEditing(false); // Exit editing mode
                  setFormData(user); // Reset form data
                  setIsFormChanged(false)
                }} 
              >
                Cancel
              </Button>
            </div>
          </div>
          )}
        </CardContent>
      </Card>

      {/* Volunteer History Tabs */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">📜 Volunteer Activities</CardTitle>
          <CardDescription>View your upcoming and past volunteer activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Activities</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {upcomingActivities.length > 0 ? (
                <ul className="space-y-4">
                  {upcomingActivities.map((entry) => (
                    <li key={entry._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-medium">🎪 Event: {entry?.title || "Unknown Event"}</p>
                      <p className="text-gray-600">⏰ Hours Volunteered: {entry.time}</p>
                      <p className="text-gray-600">📅 Date: {new Date(entry.date).toLocaleDateString()}</p>
                      <p className="text-gray-600">📍 Location: {entry.location}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No upcoming activities.</p>
              )}
            </TabsContent>
            <TabsContent value="past">
              {pastActivities.length > 0 ? (
                <ul className="space-y-4">
                  {pastActivities.map((entry) => (
                    <li key={entry._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-medium">🎪 Event: {entry?.title || "Unknown Event"}</p>
                      <p className="text-gray-600">⏰ Hours Volunteered: {entry.time}</p>
                      <p className="text-gray-600">📅 Date: {new Date(entry.date).toLocaleDateString()}</p>
                      <p className="text-gray-600">📍 Location: {entry.location}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No past activities.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}