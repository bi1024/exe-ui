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
  handleSearchClick: () => void; // This seems unused in the current component, but keeping it as per original
}

export default function TutorsList({ tutors }: Props) {
  const navigate = useNavigate();

  function renderStars(rating: number) {
    const stars = [];

    const fullStars = Math.floor(rating);
    // Adjusted logic for half star to match visual representation: 0.25-0.74 is a half star
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

    // Half star (visually, we'll just have the full star icon for simplicity as the image doesn't clearly show half-filled icons)
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400" // Treat as a full star for visual simplicity
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {tutors.map((tutor) => (
        <Card
          key={tutor._id}
          className="overflow-hidden hover:shadow-lg transition-shadow relative"
        >
          <CardHeader className="p-0">
            <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
              <img
                src={tutor?.avatarUrl}
                alt={tutor?.fullname}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Tutor Name */}
              <div className="absolute bottom-4 left-4 text-white">
                <CardTitle className="text-2xl font-bold">
                  {tutor.fullname}
                </CardTitle>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                + Ambassador
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4 px-4 pb-2">
            <div className="flex items-center mt-2">
              {renderStars(tutor.ratingAverage)}{" "}
              {/* {tutor.numberOfReviews && (
                <span className="text-sm text-muted-foreground ml-1">
                  ({tutor.numberOfReviews} reviews)
                </span>
              )} */}
            </div>
            <CardDescription className="mt-2 text-base text-black font-semibold">
              {tutor.skills.map((skill) => skill.name).join(", ")}
            </CardDescription>
            {/* {tutor.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {tutor.description}
              </p>
            )} */}
          </CardContent>
          <CardFooter className="flex flex-col items-start px-4 pb-4 pt-0">
            <div className="flex items-baseline text-lg font-bold text-gray-800">
              {tutor.hourlyRate}vnd/h{" "}
              <span className="ml-2 text-sm text-red-500 font-normal">
                • 1st lesson free
              </span>
            </div>
            <Button
              size="sm"
              className="w-full gap-2 mt-4"
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
