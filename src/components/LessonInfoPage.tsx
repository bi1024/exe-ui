import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import {
  Clock,
  MapPin,
  Star,
  MessageCircle,
  Video,
  FileText,
  DollarSign,
} from "lucide-react";

export default function LessonInfoPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock lesson data
  const lesson = {
    id: "lesson-123",
    title: "Advanced JavaScript Concepts",
    description:
      "Deep dive into closures, prototypes, and async programming patterns in JavaScript.",
    price: 45,
    duration: 60,
    teacher: {
      id: "teacher-456",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 4.8,
      reviewCount: 124,
      subject: "Web Development",
      experience: "8 years",
    },
    tags: ["JavaScript", "Advanced", "Programming", "Web Development"],
  };

  const handleBookLesson = () => {
    navigate(`/payment/${lesson.id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Teacher info */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <img src={lesson.teacher.avatar} alt={lesson.teacher.name} />
                </Avatar>
                <div>
                  <CardTitle>{lesson.teacher.name}</CardTitle>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {lesson.teacher.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({lesson.teacher.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{lesson.teacher.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{lesson.teacher.experience} of experience</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Teacher
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Times</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mb-4"
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  "9:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "1:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                ].map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Lesson details */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration} minutes</span>
                      <Separator orientation="vertical" className="h-4" />
                      <DollarSign className="h-4 w-4" />
                      <span>${lesson.price} per session</span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {lesson.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p className="text-gray-700">{lesson.description}</p>
                  <p className="mt-4 text-gray-700">
                    This comprehensive lesson will cover advanced JavaScript
                    concepts that are essential for modern web development.
                    You'll learn how to leverage closures for data privacy,
                    understand the prototype chain for inheritance, and master
                    asynchronous programming patterns including Promises and
                    async/await.
                  </p>
                  <p className="mt-4 text-gray-700">
                    By the end of this session, you'll have a deeper
                    understanding of JavaScript's core mechanisms and be able to
                    write more efficient, maintainable code.
                  </p>
                </TabsContent>
                <TabsContent value="materials" className="mt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Comprehensive lesson slides (PDF)</li>
                    <li>Code examples repository (GitHub)</li>
                    <li>Practice exercises with solutions</li>
                    <li>Recommended reading resources</li>
                  </ul>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                              alt="User"
                            />
                          </Avatar>
                          <div>
                            <p className="font-medium">Student {i}</p>
                            <div className="flex items-center">
                              {Array(5)
                                .fill(0)
                                .map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${j < 5 - (i % 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              <span className="text-xs text-gray-500 ml-1">
                                2 weeks ago
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Great lesson! The teacher explained complex concepts
                          in an easy-to-understand way. I especially appreciated
                          the practical examples and hands-on exercises.
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">${lesson.price}</p>
                <p className="text-sm text-gray-500">per session</p>
              </div>
              <Button onClick={handleBookLesson} size="lg">
                Book This Lesson
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Lesson Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Video className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">Online Video</p>
                    <p className="text-sm text-gray-500">
                      Join via Zoom or our platform
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <MapPin className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-medium">In-Person Option</p>
                    <p className="text-sm text-gray-500">
                      Available at teacher's location
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
