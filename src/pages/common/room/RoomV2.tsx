import { RoomContext } from "@/context/RoomContext";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import VideoPlayer from "./components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, X } from "lucide-react";

export default function Room() {

    const navigate = useNavigate();
    const { id : roomId } = useParams();
    const { ws, myPeer, stream, peers, myCall, handleToogleAudio, handleToogleVideo,handleClickEndMeeting } = useContext(RoomContext);

    let audioEnabled = stream.getAudioTracks()[0].enabled;
    let videoEnabled = stream.getVideoTracks()[0].enabled;

    return (
        <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center p-4">
            <div className="flex flex-col justify-center items-center h-[60vh] w-[60vw] gap-4">
                {Object.values(peers).map(peer => {
                    return (
                        <VideoPlayer key={peer.id} className="w-full h-full" stream={peer.stream} isMuted={false}/>
                    )
                })}
                <div className="flex flex-row gap-4">

                    <Button className="flex flex-row gap-2 rounded-lg items-center" onClick={handleToogleAudio}>
                        {audioEnabled ? <Mic/> : <MicOff/>}
                    </Button>

                    <Button className="flex flex-row gap-2 rounded-lg items-center" onClick={handleToogleVideo}>
                        {videoEnabled ? <Video/> : <VideoOff/>}
                    </Button>

                    <Button className="flex flex-row gap-2 rounded-lg items-center" onClick={handleClickEndMeeting}>
                        <X/> <div>End meeting</div>
                    </Button>
                </div>
            </div>
            <div className="fixed bottom-8 right-4 w-[20vw] h-[20vh]">
                <VideoPlayer className="w-full h-full" stream={stream} isMuted={true}/>
            </div>
        </div>
    )
}