import { useContext } from "react";
import Create from "./components/CreateButton";
import { RoomContext } from "@/context/RoomContext";

export default function StartMeetingButton() {

    const { ws } = useContext(RoomContext);
    function createRoom() {
        ws.emit('create-room');
    }

    return (
        <div onClick={createRoom} className="flex items-center justify-center w-screen h-screen">
            <Create/>
        </div>
    )
}