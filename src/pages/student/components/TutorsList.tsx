import { ITutor } from "@/components/home";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  tutors: ITutor[];
  handleSearchClick: () => void;
}

export default function TutorsList({ tutors }: Props) {
  const navigate = useNavigate();

  function renderStars(rating: number) {
    const stars = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 text-yellow-400"
          style={{
            position: "relative",
            clipPath: "inset(0 50% 0 0)", // clip nửa trái
          }}
        />
      );
      stars.push(
        <Star
          key="half-empty"
          className="w-4 h-4 text-muted-foreground"
          style={{
            position: "relative",
            clipPath: "inset(0 0 0 50%)", // clip nửa phải
            marginLeft: "-1rem", // overlap với nửa trái
          }}
        />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />
      );
    }

    return <div className="flex gap-1 items-center">{stars}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
      {tutors.map((tutor) => (
        <Card
          key={tutor._id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <CardHeader className="p-0">
            <div className="relative h-48 bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <Avatar className="h-40 w-40 border-4 border-background">
                  <AvatarImage src={tutor?.avatarUrl} alt={tutor.username} />
                  <AvatarFallback>{tutor.fullname.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 text-center">
            <CardTitle>{tutor.fullname}</CardTitle>
            <CardDescription>
              <div className="flex flex-col items-center mt-2">
                <div>
                  {tutor.skills.map((skill, index) => {
                    var st = skill.name;
                    if (index < tutor.skills.length - 1) {
                      st += " | ";
                    }
                    return st;
                  })}
                </div>

                <div>Hourly Rate: {tutor.hourlyRate}</div>

                <div className="flex flex-row gap-2">
                  <div>Rating:</div> {renderStars(tutor.ratingAverage)}
                </div>
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              size="sm"
              className="w-full gap-2"
              onClick={() => {
                navigate(`/student/booking/${tutor._id}`);
              }}
            >
              <Calendar className="h-4 w-4" />
              Book
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
