import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Video } from "lucide-react";
import React from "react";

export interface LessonRaw {
  _id: string;
  tutor: {
    _id: string;
    username: string;
    email: string;
    password: string;
    fullname: string;
    phone: string;
    role: string;
    accountBalance: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  startTime: string;
  endTime: string;
  skill: {
    _id: string;
    tutor: string;
    name: string;
    description: string;
    categories: string[];
    __v: number;
  };
  isBooked: boolean;
  __v: number;
  student: string;
}

type ScheduleItemCardProps = {
  lesson: LessonRaw;
};

const ScheduleItemCard = ({ lesson }: ScheduleItemCardProps) => {
  const startTimeObject = new Date(lesson.startTime);
  const endTimeObject = new Date(lesson.endTime);

  return (
    <Card key={lesson._id}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                // src={lesson.teacherAvatar}
                alt={lesson?.tutor.fullname}
              />
              <AvatarFallback>
                {lesson?.tutor.fullname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">
                {lesson.skill.name} with {lesson.tutor.fullname}
              </h3>
              <p className="text-sm text-muted-foreground">
                {startTimeObject.toLocaleDateString()} •{" "}
                {startTimeObject.toLocaleTimeString()} -{" "}
                {endTimeObject.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {/* <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button> */}
            <Button size="sm">
              <Video className="h-4 w-4 mr-2" />
              Join Lesson
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleItemCard;
