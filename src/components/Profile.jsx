import { useState, useEffect, useContext } from "react";
import { getUserProfile, uploadProfileImage } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import styles from "../Styles/ProfileStyle.module.css";

const ProfilePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState(null);
    const { logout } = useContext(AuthContext);

    // Fetch user profile
    const fetchProfile = async () => {
        try {
            const data = await getUserProfile();
            setProfile(data);
        } catch (error) {
            toast.error("Failed to fetch profile", { position: "bottom-right" });
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    // Handle image upload
    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select an image to upload", { position: "bottom-right" });
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("profileImage", selectedFile);

            const response = await uploadProfileImage(formData);
            console.log("Upload Response:", response);

            if (response && response.profileImage) {
                fetchProfile();
                toast.success("Profile image updated successfully!", { position: "bottom-right" });
            } else {
                console.error("Invalid response from upload API:", response);
                toast.error("Failed to update profile image. Try again.", { position: "bottom-right" });
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload profile image", { position: "bottom-right" });
        } finally {
            setUploading(false);
            setSelectedFile(null);
        }
    };

    if (!profile) {
        return <p className="text-gray-500 text-center">Loading profile...</p>;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <img
                    src={profile.profileImage || "/default-avatar.png"}
                    alt="Profile"
                    className={styles.profileImage}
                />
                <h2 className={styles.profileName}>{profile.name}</h2>
                <p className={styles.profileEmail}>{profile.email}</p>
                <p className={styles.profileEmail}>{profile.createdAt}</p>

                <div className={styles.imageUploadSection}>
                    <label htmlFor="fileInput" className={styles.customFileInput}>
                        Select Image
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.hiddenFileInput}
                    />
                    {selectedFile && <p className={styles.selectedFileName}>{selectedFile.name}</p>}

                    <button
                        className={`${styles.uploadButton} ${uploading ? styles.uploadingButton : ""}`}
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Change Profile Image"}
                    </button>
                </div>

                <button className={styles.logoutButton} onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default ProfilePage;
