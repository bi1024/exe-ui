import { RoomContext } from "@/context/RoomContext";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import VideoPlayer from "./components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Room() {

    const navigate = useNavigate();
    const { id : roomId } = useParams();
    const { ws, myPeer, stream, peers, myCall } = useContext(RoomContext);

    useEffect(() => {
        console.log(`join room ${roomId}`);
        if(myPeer) ws.emit('join-room', { roomId, peerId: (myPeer as any)._id });
    }, [ws, roomId, myPeer]);

    function handleClickEndMeeting() {
        if(myCall) {
            myCall.close();
            ws.emit('leave-room');
        }
        navigate('/');
    }

    return (
        <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center p-4">
            <div className="flex flex-col justify-center items-center h-[60vh] w-[60vw] gap-4">
                {Object.values(peers).map(peer => {
                    return (
                        <VideoPlayer key={peer.id} className="w-full h-full" stream={peer.stream} isMuted={false}/>
                    )
                })}
                <Button className="flex flex-row rounded-lg gap-2" onClick={handleClickEndMeeting}>
                    <X/> <div>End meeting</div>
                </Button>
            </div>
            <div className="fixed bottom-8 right-4 w-[20vw] h-[20vh]">
                <VideoPlayer className="w-full h-full" stream={stream} isMuted={true}/>
            </div>
        </div>
    )
}