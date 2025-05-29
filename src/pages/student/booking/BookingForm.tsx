import apiClient from "@/api/apiClient";
import Calendar from "@/components/calendar/Calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Sidebar from "@/pages/student/booking/components/Sidebar";
import { ISlot, ISlotReturned } from "@/pages/tutor/schedule/EditSlotsForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const test = "682aecc3f896b563e90d4310";

export default function BookingForm() {
  const { tutorId } = useParams();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [showingImage, setShowingImage] = useState<string | null>(null);
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

  function toggleOffCanvas() {
    setShowOffCanvas(!showOffCanvas);
  }

  function handleSelectSlot(slot: ISlot) {
    setSelectedSlot(slot);
    setShowOffCanvas(true);
  }

  return (
    <div className="p-5">
      <Sidebar
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        selectedSlot={selectedSlot}
      />
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
      <Calendar slots={slots} handleSelectSlot={handleSelectSlot} />
      {certifications?.map((cert) => (
        <div
          key={cert._id}
          className="min-w-[200px] bg-white rounded-xl shadow p-4 flex-shrink-0"
        >
          <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">
            {cert.description}
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => setShowingImage(cert.imageUrl)}
              >
                View Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <img
                src={showingImage ?? ""}
                alt="Certification"
                className="w-full h-auto rounded"
              />
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
