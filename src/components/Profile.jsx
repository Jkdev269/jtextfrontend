import { useState, useEffect, useContext } from "react";
import { getUserProfile, uploadProfileImage } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Camera, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { logout } = useContext(AuthContext);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);
      const response = await uploadProfileImage(formData);
      if (response?.profileImage) {
        await fetchProfile();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-b-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-screen bg-black">
      <Card className="max-w-lg w-full bg-opacity-10 backdrop-blur-lg shadow-xl rounded-2xl border border-gray-700">
        <CardContent className="p-8 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6">
            <img
              src={profile.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-500 shadow-lg"
            />
            <label
              htmlFor="fileInput"
              className="absolute bottom-2 right-2 p-3 bg-blue-500 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-1">
            {profile.name}
          </h1>
          <p className="text-gray-400">{profile.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Member since {new Date(profile.createdAt).toLocaleDateString()}
          </p>

          {selectedFile && (
            <Alert className="mt-6 w-full bg-blue-500/10 border border-blue-400/30 rounded-lg">
              <AlertDescription className="text-center text-gray-300">
                <p className="mb-3">Ready to update your profile picture?</p>
                <div className="flex justify-center gap-4 w-3xs">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-blue-500 text-white  font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "Update"}
                  </button>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Button
            variant="destructive"
            size="lg"
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg shadow-md flex items-center justify-center gap-2"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 inline" /> <span> Sign Out</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
