import apiClient from "@/api/apiClient";
import Calendar from "@/components/calendar/Calendar";
import Sidebar from "@/pages/student/booking/components/Sidebar";
import { ISlot, ISlotReturned } from "@/pages/tutor/schedule/EditSlotsForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const test = "682aecc3f896b563e90d4310";

export default function BookingForm() {
  const { tutorId } = useParams();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

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
      <Calendar slots={slots} handleSelectSlot={handleSelectSlot} />
    </div>
  );
}
