import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getHelpRequests, addCommentToRequest } from "@/utils/api"; // API Calls
import { useAuth } from "@/context/AuthContext"; // Authentication Context

export default function CommunityHelp() {
  const { user, token } = useAuth();
  const [helpRequests, setHelpRequests] = useState([]);
  const [commentText, setCommentText] = useState({});
  
  useEffect(() => {
    fetchHelpRequests();
  }, []);

  // Fetch all help requests
  const fetchHelpRequests = async () => {
    try {
      const data = await getHelpRequests();
      setHelpRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Handle comment input change
  const handleCommentChange = (requestId, value) => {
    setCommentText((prev) => ({ ...prev, [requestId]: value }));
  };

  // Submit a new comment
  const handleAddComment = async (requestId) => {
    if (!commentText[requestId]) return;
    
    try {
      await addCommentToRequest(token, requestId, commentText[requestId]);
      setCommentText((prev) => ({ ...prev, [requestId]: "" })); // Clear input
      fetchHelpRequests(); // Refresh comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Urgency Badge Colors
  const urgencyColors = {
    Urgent: "bg-red-500 text-white",
    Medium: "bg-orange-500 text-white",
    Low: "bg-green-500 text-white",
  };

  if (!helpRequests) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 bg-white p-2 lg:p-6">
      <h1 className="text-xl lg:text-3xl font-bold text-center">🤝 Community Help Requests</h1>
      
      {helpRequests.length > 0 ? (
        helpRequests.map((request) => (
          <Card key={request._id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {request.title}
                <span className={`px-3 py-1 text-sm rounded-full ${urgencyColors[request.urgency]}`}>
                  {request.urgency}
                </span>
              </CardTitle>
              <CardDescription>By: {request.createdBy.name} | 📅 {new Date(request.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{request.description}</p>

              {/* Comment Section */}
              <h3 className="font-semibold text-lg mb-2">💬 Comments</h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {request.comments.length > 0 ? (
                  request.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((comment) => (
                      <div key={comment._id} className="p-2 border-b">
                        <p className="text-sm font-semibold">{comment.userName || "Unknown User"}</p>
                        <p className="text-gray-600">{comment.message}</p>
                        <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>

              {/* Add Comment Input */}
              <div className="mt-4">
                <Label>Add a Comment:</Label>
                <Textarea 
                  value={commentText[request._id] || ""}
                  onChange={(e) => handleCommentChange(request._id, e.target.value)}
                  className="mt-2"
                  placeholder="Write a comment..."
                />
                <Button 
                  className="mt-2"
                  onClick={() => handleAddComment(request._id)}
                  disabled={!commentText[request._id]}
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No help requests found.</p>
      )}
    </div>
  );
}
