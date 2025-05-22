import Calendar from "@/components/calendar/Calendar";
import Sidebar from "@/pages/tutor/schedule/components/Sidebar";
import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { ISkill } from "../skills/SkillsList";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export interface ISlot {
  _id: string;
  startTime: Date;
  endTime: Date;
  skill: string;
  isBooked: boolean;
}

export type ISlotAdded = Pick<ISlot, "startTime" | "endTime" | "skill">;
export type ISlotUpdated = Pick<
  ISlot,
  "_id" | "startTime" | "endTime" | "skill"
>;

export type ISlotReturned = Pick<
  ISlot,
  "_id" | "startTime" | "endTime" | "isBooked"
> & { skill: { _id: string; name: string } };

export default function EditSlotsForm() {
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<ISlot>(null);

  const [skills, setSkills] = useState<ISkill[]>();

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await apiClient.get("/tutor/skills");

        setSkills(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchSlots() {
      try {
        const response = await apiClient.get("/tutor/schedules");

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

    fetchSkills();
    fetchSlots();
  }, []);

  function toggleOffCanvas() {
    setShowOffCanvas(!showOffCanvas);
  }

  async function handleAddSlot(slotAdded: ISlotAdded) {
    // handle backend response
    try {
      const response = await apiClient.post("/tutor/schedules", slotAdded);
      const slot = response.data as ISlotReturned;
      const slotFormatted = { ...slot, skill: slot.skill.name };
      setSlots([...slots, slotFormatted]);
    } catch (err) {
      console.log(err);
    }

    setShowOffCanvas(false);
  }

  async function handleEditSlot(slotId: string, slotUpdated: ISlotUpdated) {
    // handle backend response
    try {
      const response = await apiClient.put(
        `/tutor/schedules/${slotId}`,
        slotUpdated
      );
      const slot = response.data as ISlotReturned;
      const slotFormatted = { ...slot, skill: slot.skill.name };
      setSlots(
        slots.map((slot) =>
          slot._id === slotFormatted._id ? slotFormatted : slot
        )
      );
    } catch (err) {
      console.log(err);
    }
    setShowOffCanvas(false);
  }

  async function handleDeleteSlot(id: string) {
    try {
      await apiClient.delete(`/tutor/schedules/${id}`);
      setSlots(slots.filter((slot) => slot._id !== id));
    } catch (err) {
      console.log(err);
    }
    setShowOffCanvas(false);
  }

  function handleSelectSlot(slot: ISlot) {
    setSelectedSlot(slot);
    setShowOffCanvas(true);
  }

  if (!slots || !skills) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="mb-3">
        <Button
          className="bg-[#358EDD] border-0 p-2.5 cursor-pointer text-white mx-2"
          onClick={() => {
            setSelectedSlot(null);
            toggleOffCanvas();
          }}
        >
          Add Slot
        </Button>
        <Button
          className="bg-[#358EDD] border-0 p-2.5 cursor-pointer text-white mx-2"
          onClick={() => {
            navigate("/tutor/dashboard");
          }}
        >
          Back
        </Button>
      </div>
      <Sidebar
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        onAddSlot={handleAddSlot}
        onEditSlot={handleEditSlot}
        onDeleteSlot={handleDeleteSlot}
        selectedSlot={selectedSlot}
        skills={skills}
      />
      <Calendar slots={slots} handleSelectSlot={handleSelectSlot} />
    </div>
  );
}
