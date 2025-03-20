import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { createHelpRequest } from "@/utils/api";

export default function PostHelpRequest() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({ title: "", description: "", urgency: "Medium" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await createHelpRequest(token, formData);
      toast.success("Help request created successfully!");
      setFormData({ title: "", description: "", urgency: "Medium" }); // Reset form
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error("Failed to create request.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🆘 Create a Help Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter request title"
            required
          />
        </div>
        <div>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the help you need"
            required
          />
        </div>
        <div>
          <Select
            value={formData.urgency}
            onValueChange={(value) => setFormData({ ...formData, urgency: value })}
          >
            <SelectTrigger className="border p-2 rounded">{`Urgency: ${formData.urgency}`}</SelectTrigger>
            <SelectContent>
              <SelectItem value="High">🔥 High</SelectItem>
              <SelectItem value="Medium">⚠️ Medium</SelectItem>
              <SelectItem value="Low">✅ Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Post Request"}
        </Button>
      </form>
    </div>
  );
}
