import apiClient from "@/api/apiClient";
import Calendar from "@/components/calendar/Calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/pages/student/booking/components/Sidebar";
import { ISlot, ISlotReturned } from "@/pages/tutor/schedule/EditSlotsForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Mail, Calendar as CalendarIcon } from "lucide-react";

const test = "682aecc3f896b563e90d4310";

export default function BookingForm() {
  const { tutorId } = useParams();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [showingImage, setShowingImage] = useState<string | null>(null);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getCerts = async () => {
      const result = await apiClient.get(`/tutor/certs/${tutorId}`);
      // console.log(result.data.data);
      setCertifications(result.data.data);
    };
    getCerts();
  }, []);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await apiClient.get(
          `/student/booking?tutorId=${tutorId}`
        );

        const slots = response.data as ISlotReturned[];
        const slotsFormatted = slots.map((slot) => ({
          ...slot,
          skill: slot.skill.name,
        }));
        setSlots(slotsFormatted);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSlots();
  }, []);

  useEffect(() => {
    async function fetchTutor() {
      try {
        const response = await apiClient.get(`/profile/${tutorId}`);

        console.log("profile", response.data);
        setProfile(response.data);
        // setSlots(slotsFormatted);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTutor();
  }, []);

  function toggleOffCanvas() {
    setShowOffCanvas(!showOffCanvas);
  }

  function handleSelectSlot(slot: ISlot) {
    setSelectedSlot(slot);
    setShowOffCanvas(true);
  }

  function handleOnClickViewTutorDetails() {
    navigate(`/student/tutor-details/${tutorId}`);
  }

  return (
    <div className="p-5 flex flex-col gap-4">
      <Sidebar
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        selectedSlot={selectedSlot}
      />
      <div className="flex flex-row gap-2">
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>

        <Button onClick={handleOnClickViewTutorDetails}>
          View Tutor Details
        </Button>
      </div>
      <Calendar slots={slots} handleSelectSlot={handleSelectSlot} />
    </div>
  );
}

      // <div className="min-h-screen bg-gray-50 p-6">
      //   <div className="max-w-4xl mx-auto space-y-6">
      //     {/* Header */}
      //     <div className="flex items-center justify-between">
      //       <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      //     </div>

      //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      //       {/* Profile Card */}
      //       <div className="lg:col-span-1">
      //         <Card>
      //           <CardHeader className="text-center">
      //             <Avatar className="w-24 h-24 mx-auto mb-4 ">
      //               <AvatarImage
      //                 className="w-full h-full object-cover"
      //                 src={profile?.avatarUrl}
      //               />
      //               <AvatarFallback>{profile?.fullname}</AvatarFallback>
      //             </Avatar>

      //             <CardTitle className="text-xl">{profile?.fullname}</CardTitle>
      //           </CardHeader>
      //           <CardContent className="space-y-4">
      //             <div className="flex items-center space-x-2">
      //               <Mail className="w-4 h-4 text-gray-500" />
      //               {/* {isEditing ? (
      //                     <Input
      //                     value={profile.email}
      //                     onChange={(e) =>
      //                     setProfile({ ...profile, email: e.target.value })
      //                     }
      //                     type="email"
      //                     />
      //                     ) : ( */}
      //               <span className="text-sm text-gray-600">
      //                 {profile?.email}
      //               </span>
      //             </div>

      //             <div className="flex items-center space-x-2">
      //               <CalendarIcon className="w-4 h-4 text-gray-500" />
      //               <span className="text-sm text-gray-600">
      //                 Joined {profile?.createdAt}
      //               </span>
      //             </div>
      //           </CardContent>
      //         </Card>
      //       </div>

      //       {/* Main Content */}
      //       <div className="lg:col-span-2 space-y-6">
      //         {/* Bio Section */}
      //         <Card>
      //           <CardHeader>
      //             <CardTitle>About Me</CardTitle>
      //           </CardHeader>
      //           <CardContent>
      //             <p className="text-gray-600">{profile?.bio}</p>
      //           </CardContent>
      //         </Card>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      // {certifications?.map((cert) => (
      //   <div
      //     key={cert._id}
      //     className="min-w-[200px] bg-white rounded-xl shadow p-4 flex-shrink-0"
      //   >
      //     <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
      //     <p className="text-xs text-muted-foreground mb-2">
      //       {cert.description}
      //     </p>
      //     <p className="text-xs text-muted-foreground mb-2">
      //       {cert?.skill?.name}
      //     </p>

      //     <Dialog>
      //       <DialogTrigger asChild>
      //         <Button
      //           variant="outline"
      //           className="text-xs"
      //           onClick={() => setShowingImage(cert.imageUrl)}
      //         >
      //           View Image
      //         </Button>
      //       </DialogTrigger>
      //       <DialogContent className="max-w-lg">
      //         <img
      //           src={showingImage ?? ""}
      //           alt="Certification"
      //           className="w-full h-auto rounded"
      //         />
      //       </DialogContent>
      //     </Dialog>
      //   </div>
      // ))}