import { ISlot } from "@/pages/tutor/schedule/EditSlotsForm";
import moment from "moment";
import { useEffect, useState } from "react";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { ISkill } from "@/pages/tutor/skills/SkillsList";
import { X } from "lucide-react";

interface Props {
  show: boolean;
  onHide: () => void;
  selectedSlot: ISlot;
}

export default function Sidebar({ show, onHide, selectedSlot }: Props) {
  const [skill, setSkill] = useState<string>("");
  const [date, setDate] = useState<Date | string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  useEffect(() => {
    if (selectedSlot) {
      setSkill(selectedSlot.skill || "");
      setDate(selectedSlot.startTime || "");
      setStartTime(
        selectedSlot.startTime
          ? moment(selectedSlot.startTime).format("HH:mm")
          : ""
      );
      setEndTime(
        selectedSlot.endTime ? moment(selectedSlot.endTime).format("HH:mm") : ""
      );
    } else {
      setSkill("");
      setDate("");
      setStartTime("");
      setEndTime("");
    }
  }, [selectedSlot]);

  const handleBooking = async (slotId) => {
    console.log(slotId);
  };

  return (
    <div
      className={`fixed top-0 ${
        show ? "left-0" : "left-[-250px]"
      } w-[250px] h-screen bg-gray-100 transition-[left] duration-300 ease-in-out z-[1000]`}
    >
      <div className="h-full p-5">
        <div className="flex justify-between items-center mb-5">
          <div className="text-2xl font-bold">Book Slot</div>
          <button
            className="bg-red-500 border-none cursor-pointer text-white rounded-[50%]"
            onClick={onHide}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100%-60px)]">
          <Label className="text-lg font-medium">Skill</Label>
          <Input value={skill} disabled />

          <Label className="text-base font-normal">Date</Label>
          <input
            className="w-[90%] p-2 border border-gray-300 rounded text-sm"
            type="date"
            value={date ? moment(date).format("YYYY-MM-DD") : ""}
            disabled
          />

          <Label className="text-base font-normal">Start Time</Label>
          <input
            className="w-[90%] p-2 border border-gray-300 rounded text-sm"
            type="time"
            value={startTime}
            disabled
          />

          <Label className="text-base font-normal">End Time</Label>
          <input
            className="w-[90%] p-2 border border-gray-300 rounded text-sm"
            type="time"
            value={endTime}
            disabled
          />

          <div className="w-[90%] grid grid-cols-2">
            {selectedSlot && (
              <button
                className="grid-cols-1 btn bg-green-500 border-none p-2.5 cursor-pointer text-white"
                onClick={() => {
                  handleBooking(selectedSlot._id);
                }}
              >
                Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
