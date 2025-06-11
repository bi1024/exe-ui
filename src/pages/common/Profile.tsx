import { Edit, Mail, Phone, MapPin, Calendar, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserHeader from "@/components/UserHeader";
import { Badge } from "@/components/ui/badge";
import apiClient from "@/api/apiClient";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState({
    fullname: "Alex Johnson",
    avatarUrl: "",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate learner interested in mathematics, science, and programming. Looking to improve my skills through personalized tutoring sessions.",
    createdAt: "January 2024",
    completedLessons: 12,
    upcomingLessons: 3,
    interests: ["Mathematics", "Physics", "Programming", "Chemistry"],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await apiClient.get("/profile/myProfile");
      console.log(result.data);
      setProfile(result.data);
      return result.data;
    };
    fetchProfile();
  }, []);

  const [originalProfile, setOriginalProfile] = useState(profile);

  const handleSave = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("fullname", profile.fullname);
    formData.append("bio", profile.bio);
    // formData.append("certDesc", certDesc);
    const result = await apiClient.post("/profile/myProfile", formData);
    setProfile(result.data);
    setIsLoading(false);
    // setCertifications([...certifications, result.data.result]);

    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);

    // Reset form data if needed
  };

  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <Button
              onClick={() => {
                setOriginalProfile(profile);

                setIsEditing(!isEditing);
              }}
              variant={isEditing ? "outline" : "default"}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ">
                    <AvatarImage
                      className="w-full h-full object-cover"
                      src={profile.avatarUrl}
                    />
                    <AvatarFallback>{profile.fullname}</AvatarFallback>
                  </Avatar>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="picture">Profile picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        onChange={(event) => {
                          setSelectedImage(event.target.files[0]); // Update the state with the selected file
                        }}
                      />
                      <Input
                        value={profile.fullname}
                        onChange={(e) =>
                          setProfile({ ...profile, fullname: e.target.value })
                        }
                        className="text-center font-semibold"
                      />
                    </div>
                  ) : (
                    <CardTitle className="text-xl">
                      {profile.fullname}
                    </CardTitle>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {/* {isEditing ? (
                    <Input
                    value={profile.email}
                    onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                    }
                    type="email"
                    />
                    ) : ( */}
                    <span className="text-sm text-gray-600">
                      {profile.email}
                    </span>
                    {/* )} */}
                  </div>
                  {/* <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {isEditing ? (
                    <Input
                    value={profile.phone}
                    onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                    }
                      type="tel"
                      />
                      ) : (
                        <span className="text-sm text-gray-600">
                        {profile.phone}
                        </span>
                        )}
                        </div> */}
                  {/* <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {isEditing ? (
                    <Input
                    value={profile.location}
                    onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                    }
                    />
                    ) : (
                      <span className="text-sm text-gray-600">
                      {profile.location}
                      </span>
                      )}
                      </div> */}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Joined {profile.createdAt}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-600">{profile.bio}</p>
                  )}
                </CardContent>
              </Card>

              {/* Learning Stats */}
              {/* <Card>
              <CardHeader>
              <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Learning Progress
              </CardTitle>
              </CardHeader>
              <CardContent>
              <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                      {profile.completedLessons}
                      </div>
                      <div className="text-sm text-gray-600">
                      Completed Lessons
                      </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                      {profile.upcomingLessons}
                      </div>
                      <div className="text-sm text-gray-600">
                      Upcoming Lessons
                      </div>
                      </div>
                      </div>
                      </CardContent>
                      </Card> */}

              {/* Interests */}
              {/* <Card>
              <CardHeader>
              <CardTitle>Learning Interests</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <Badge key={index} variant="secondary">
                {interest}
                </Badge>
                ))}
                </div>
                </CardContent>
                </Card> */}

              {/* Save/Cancel Buttons */}
              {isEditing && (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
