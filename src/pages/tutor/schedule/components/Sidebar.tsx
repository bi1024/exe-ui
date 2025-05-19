import { ISlot, ISlotAdded, ISlotUpdated } from "@/pages/tutor/schedule/EditSlotsForm"
import moment from "moment"
import { useEffect, useState } from "react"
import { Label } from "../../../../components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu";
import { Input } from "../../../../components/ui/input";
import { ISkill } from "@/pages/tutor/skills/SkillsList";
import { X } from "lucide-react";

interface Props {
    show: boolean
    onHide: () => void
    onAddSlot: (slot: ISlotAdded) => void
    onEditSlot: (slotId: string, slot: ISlotUpdated) => void
    onDeleteSlot: (id: string) => void
    selectedSlot: ISlot

    skills: ISkill[]
}

export default function Sidebar({ show, onHide, onAddSlot, onEditSlot, onDeleteSlot, selectedSlot, skills }: Props) {
    const [skill, setSkill] = useState<string>('');
    const [date, setDate] = useState<Date | string>();
    const [startTime, setStartTime] = useState<string>();
    const [endTime, setEndTime] = useState<string>();

    useEffect(() =>{
        if(selectedSlot) {
            setSkill(selectedSlot.skill || '');
            setDate(selectedSlot.startTime || '');
            setStartTime(selectedSlot.startTime ? moment(selectedSlot.startTime).format('HH:mm') : '');
            setEndTime(selectedSlot.endTime ? moment(selectedSlot.endTime).format('HH:mm') : '');
        } else {
            setSkill('');
            setDate('');
            setStartTime('');
            setEndTime('');
        }
    }, [selectedSlot]);

    function handleSubmit() {

        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);
        const startTimeFormatted = moment(date).set({ hour: startHour, minute: startMinute }).toDate();

        const endHour = parseInt(endTime.split(':')[0]);
        const endMinute = parseInt(endTime.split(':')[1]);
        const endTimeFormatted = moment(date).set({ hour: endHour, minute: endMinute }).toDate();

        if(selectedSlot) {
            const slotUpdated : ISlotUpdated = {
                ...selectedSlot,
                skill,
                startTime: startTimeFormatted,
                endTime: endTimeFormatted
            }
            onEditSlot(selectedSlot._id, slotUpdated);
        } else {
            const slotAdded : ISlotAdded = {
                skill,
                startTime: startTimeFormatted,
                endTime: endTimeFormatted
            }
            onAddSlot(slotAdded);
        }
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const dateSelected = event.target.value;
        const today = new Date().toISOString().split('T')[0];

        if(dateSelected >= today) {
            setDate(dateSelected);
        }
    }

    function handleDelete() {
        if(selectedSlot) {
            onDeleteSlot(selectedSlot._id);
        }
    }

    return (
        <div className=
            {`fixed top-0 ${show ? 'left-0' : 'left-[-250px]'} w-[250px] h-screen bg-gray-100 transition-[left] duration-300 ease-in-out z-[1000]`}
        >
            <div className="h-full p-5">
                <div className="flex justify-between items-center mb-5">
                    <div className="text-2xl font-bold">{selectedSlot ? 'Edit Slot' : 'Add Slot'}</div>
                    <button className="bg-red-500 border-none cursor-pointer text-white rounded-[50%]" onClick={onHide}><X/></button>
                </div>
                <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100%-60px)]">
                    <Label className="text-lg font-medium">Skill</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Input className="w-[90%] p-2 border border-gray-300 rounded text-sm text-left" value={skill}/>
                        </DropdownMenuTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuContent className="z-[1000]">
                                {skills.map((skill) => {
                                    return (
                                        <DropdownMenuItem key={skill.name} onSelect={() => setSkill(skill.name)}>{skill.name}</DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>

                    <Label className="text-base font-normal">Date</Label>
                    <input
                        className="w-[90%] p-2 border border-gray-300 rounded text-sm"
                        type="date"
                        value={date ? moment(date).format('YYYY-MM-DD') : ''}
                        onChange={handleDateChange}
                    />

                    <Label className="text-base font-normal">Start Time</Label>
                    <input
                        className="w-[90%] p-2 border border-gray-300 rounded text-sm"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />

                    <Label className="text-base font-normal">End Time</Label>
                    <input
                        className="w-[90%] p-2 border border-gray-300 rounded text-sm"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    
                    <div className="w-[90%] grid grid-cols-2 gap-2">
                        <button className="grid-cols-1 btn bg-green-500 border-none p-2.5 cursor-pointer text-white" onClick={handleSubmit}>{selectedSlot ? 'Update' : 'Submit'}</button>
                        {selectedSlot && <button className="grid-cols-1 btn bg-red-500 border-none p-2.5 cursor-pointer text-white" onClick={handleDelete}>Delete</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}