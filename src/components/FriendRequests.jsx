import { useState, useEffect } from "react";
import { acceptFriendRequest, rejectFriendRequest, getUserProfile } from "../api/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const profileData = await getUserProfile();
        setRequests(profileData?.friendRequests || []);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
        setRequests([]);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    setLoading(requestId);
    try {
      await acceptFriendRequest(requestId);
      setRequests((prevRequests) => prevRequests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
    setLoading(null);
  };

  const handleReject = async (requestId) => {
    setLoading(requestId);
    try {
      await rejectFriendRequest(requestId);
      setRequests((prevRequests) => prevRequests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center text-white overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">🤝 Friend Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-400 text-center">No friend requests available.</p>
      ) : (
        <ul className="w-full max-w-md space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="bg-gray-800 shadow-md rounded-lg">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  {loading === request.id ? (
                    <Skeleton className="w-12 h-12 rounded-full" />
                  ) : (
                    <img
                      src={request.senderProfileImage || '/default-avatar.png'}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border border-gray-600"
                    />
                  )}
                  <div>
                    <p className="text-white font-medium">{request.senderName}</p>
                    <p className="text-gray-400 text-sm">@{request.senderUsername}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-500 text-white"
                    onClick={() => handleAccept(request.id)}
                    disabled={loading === request.id}
                  >
                    {loading === request.id ? "Accepting..." : "Accept"}
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-500 text-white"
                    onClick={() => handleReject(request.id)}
                    disabled={loading === request.id}
                  >
                    {loading === request.id ? "Rejecting..." : "Reject"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;
