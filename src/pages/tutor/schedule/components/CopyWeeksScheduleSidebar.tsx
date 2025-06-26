import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { toast } from "@/components/ui/use-toast";

interface Props {
    show: boolean
    onHide: () => void
}

export default function CopyWeeksScheduleSidebar({ show, onHide } : Props) {

    const [upcomingWeeks, setUpcomingWeeks] = useState<string[]>();

    // const [numberOfWeeks, setNumberOfWeeks] = useState<number>();
    const [selectedWeek, setSelectedWeek] = useState<string>();

    useEffect(() => {
        setUpcomingWeeks(getUpcomingWeeks(12)); // 3 months
    }, []);

    function getUpcomingWeeks(numberOfWeeks: number) {
        const upcomingWeeks : string[] = [];
        const today = new Date();
        
        const startOfNextWeek = startOfWeek(addWeeks(today, 1), {
            weekStartsOn: 1
        })
        
        for(let i = 0; i < numberOfWeeks; ++i) {
            const targetWeek = addWeeks(startOfNextWeek, i);
            const weekStart = startOfWeek(targetWeek, { weekStartsOn: 1 });
            const weekEnd = endOfWeek(targetWeek, { weekStartsOn: 1 });

            upcomingWeeks.push(format(weekStart, 'dd-MM-yyyy') + ' to ' + format(weekEnd, 'dd-MM-yyyy'));
        } 
        return upcomingWeeks;
    }

    async function handleOnClickSubmit() {
        if(!selectedWeek) {
            alert('Select your wanted week');
            return;
        }
        try {
            const numberOfWeeks = upcomingWeeks.indexOf(selectedWeek) + 1;
            const response = await apiClient.post('/tutor/schedules/copy-current-week', { numberOfWeeks });
            console.log(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className=
            {`fixed top-0 ${show ? 'left-0' : 'left-[-300px]'} w-[300px] h-screen bg-gray-100 transition-[left] duration-300 ease-in-out z-[1000]`}
        >
            <div className="h-full p-5">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">Copy weeks</div>
                    <button className="bg-red-500 border-none cursor-pointer text-white rounded-[50%]" onClick={onHide}>
                        <X/>
                    </button>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                    Copy current week to other weeks
                </div>
                <div className="mt-5 flex flex-col gap-3">
                    <Label>Select week you want to copy until it</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Input value={selectedWeek} className="w-[90%] p-2 border border-gray-300 rounded text-sm text-left" />
                        </DropdownMenuTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuContent className="z-[1000]">
                                {upcomingWeeks?.map(week => {
                                    return (
                                        <DropdownMenuItem onSelect={() => setSelectedWeek(week)}>
                                            {week}
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>
                </div>
                <Button className="mt-5" onClick={handleOnClickSubmit}>Submit</Button>
            </div>
        </div>
    )
}