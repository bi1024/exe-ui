import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface TeacherCardProps {
  id: string;
  name: string;
  profileImage?: string;
  specialization: string;
  rating: number;
  pricePerHour: number;
  availableSlots: number;
  onClick?: () => void;
}

const TeacherCard = ({
  id = "1",
  name = "Jane Smith",
  profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1",
  specialization = "Mathematics",
  rating = 4.8,
  pricePerHour = 35,
  availableSlots = 5,
  onClick = () => console.log("Teacher card clicked"),
}: TeacherCardProps) => {
  // Generate initials for avatar fallback
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      className="w-[280px] h-[320px] overflow-hidden transition-all hover:shadow-lg bg-white"
      onClick={onClick}
    >
      <CardHeader className="pb-2 pt-4 flex flex-col items-center">
        <Avatar className="h-20 w-20 mb-2">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge variant="secondary" className="mt-1">
            {specialization}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="font-semibold text-primary">${pricePerHour}/hr</div>
        </div>
        <div className="text-sm text-muted-foreground">
          {availableSlots > 0 ? (
            <span className="text-green-600">
              {availableSlots} available slots
            </span>
          ) : (
            <span className="text-red-500">No available slots</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" disabled={availableSlots === 0}>
          {availableSlots > 0 ? "Book a Lesson" : "Fully Booked"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeacherCard;
