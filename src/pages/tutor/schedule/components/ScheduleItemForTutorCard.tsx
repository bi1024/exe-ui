import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RoomContext } from "@/context/RoomContext";

import { AvatarImage } from "@radix-ui/react-avatar";
import { Clock, Video } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// basic interface of Lesson
interface Props {
  _id: string
  startTime: Date
  endTime: Date
}

const ScheduleItemForTutorCard = ({ lesson }) => {
  const navigate = useNavigate();
  const startTimeObject = new Date(lesson?.startTime);
  const endTimeObject = new Date(lesson?.endTime);

  const { ws, myPeer } = useContext(RoomContext);

  function handleJoinRoom() {
    ws.emit('join-room', { peerId: (myPeer as any)._id, scheduleId: lesson._id });
    ws.on('join-succeed', ({ roomId } : { roomId: string }) => {
      navigate(`/room/${roomId}`)
    }) 
  }

  return (
    <div
      key={lesson?._id}
      className="flex items-center gap-4 p-3 rounded-lg border"
    >
      <Avatar>
        {/* <AvatarImage src={lesson.image} /> */}
        <AvatarFallback>{lesson?.student?.fullname?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">Lesson with {lesson?.student?.fullname}</p>
          {/* <Badge
                          variant={
                            lesson.status === "confirmed"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {lesson.status === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </Badge> */}
        </div>
        <p className="text-sm text-muted-foreground">{lesson?.skill.name}</p>
        <div className="flex items-center gap-2 mt-1 text-sm">
          <span>{startTimeObject.toLocaleTimeString()}</span>
          <span>•</span>
          <span>{endTimeObject.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="flex gap-2">
        {/* <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button> */}
        <Button size="sm" className="h-8 w-8 p-0" onClick={handleJoinRoom}>
          <Video className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ScheduleItemForTutorCard;
