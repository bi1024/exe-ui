import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { addMonths, addWeeks, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { toast } from "@/components/ui/use-toast";

interface Props {
    show: boolean
    onHide: () => void
}

export default function CopyMonthsScheduleSidebar({ show, onHide } : Props) {

    const [upcomingMonths, setUpcomingMonths] = useState<string[]>();

    const [selectedMonth, setSelectedMonth] = useState<string>();

    useEffect(() => {
        setUpcomingMonths(getUpcomingMonths(12)); // 12 months
    }, []);

    function getUpcomingMonths(numberOfMonths: number) {
        const upcomingMonths : string[] = [];
        const today = new Date();
        
        const startOfNextMonth = startOfMonth(addMonths(today, 1));
        
        for(let i = 0; i < numberOfMonths; ++i) {
            const monthStart = addMonths(startOfNextMonth, i);
            const monthEnd = addMonths(startOfNextMonth, i + 1);

            upcomingMonths.push(format(monthStart, 'MM-yyyy') + ' to ' + format(monthEnd, 'MM-yyyy'));
        } 
        return upcomingMonths;
    }

    async function handleOnClickSubmit() {
        if(!selectedMonth) {
            alert('Select your wanted month');
            return;
        }
        try {
            const numberOfMonths = upcomingMonths.indexOf(selectedMonth) + 1;
            const response = await apiClient.post('/tutor/schedules/copy-current-month', { numberOfMonths });
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
                    <div className="text-2xl font-bold">Copy months</div>
                    <button className="bg-red-500 border-none cursor-pointer text-white rounded-[50%]" onClick={onHide}>
                        <X/>
                    </button>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                    Copy current month to other months
                </div>
                <div className="mt-5 flex flex-col gap-3">
                    <Label>Select month you want to copy until it</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Input value={selectedMonth} className="w-[90%] p-2 border border-gray-300 rounded text-sm text-left" />
                        </DropdownMenuTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuContent className="z-[1000]">
                                {upcomingMonths?.map(month => {
                                    return (
                                        <DropdownMenuItem onSelect={() => setSelectedMonth(month)}>
                                            {month}
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