import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import { ISlot } from "@/pages/tutor/schedule/EditSlotsForm";

const localizer = momentLocalizer(moment);

interface Props {
    slots: ISlot[]
    handleSelectSlot: (slot: ISlot) => void
}

export default function Calendar({slots, handleSelectSlot} : Props) {
    return (
        <BigCalendar
            localizer={localizer}
            startAccessor='startTime'
            endAccessor='endTime'
            titleAccessor='skill'
            className="h-[95vh]"
            events={slots}
            onSelectEvent={handleSelectSlot}
        />
    )
}