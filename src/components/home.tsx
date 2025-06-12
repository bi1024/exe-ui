import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Search,
  Filter,
  Star,
  Clock,
  Calendar,
  MessageSquare,
  Video,
} from "lucide-react";
import TeacherGrid from "./TeacherGrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import apiClient from "@/api/apiClient";
import { RoomContext } from "@/context/RoomContext";
import Create from "@/pages/common/room/components/CreateButton";
import ScheduleItemCard from "@/pages/tutor/schedule/components/ScheduleItemCard";
import UserHeader from "./UserHeader";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [tutors, setTutors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ws } = useContext(RoomContext);
  function createRoom() {
    ws.emit("create-room");
  }

  // Mock data for featured teachers
  const featuredTeachers = [
    {
      id: 1,
      name: "Sarah Johnson",
      subject: "Mathematics",
      rating: 4.9,
      price: 45,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      availableSlots: 5,
    },
    {
      id: 2,
      name: "David Chen",
      subject: "Physics",
      rating: 4.8,
      price: 50,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      availableSlots: 3,
    },
    {
      id: 3,
      name: "Maria Garcia",
      subject: "Spanish",
      rating: 5.0,
      price: 40,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      availableSlots: 7,
    },
  ];
  useEffect(() => {
    if (user?.role === "tutor") {
      navigate("/tutor/dashboard");
    }
  }, [user]);

  useEffect(() => {
    async function fetchTutors() {
      try {
        const response = await apiClient.get("/tutor");

        setTutors(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchSchedules() {
      try {
        const response = await apiClient.get("/tutor/schedules/schedule-today");
        console.log(response.data);
        setSchedules(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchTutors();
    fetchSchedules();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };

  const handlePost = async () => {
    // const result = await apiClient.post("/tutor/schedules/schedule-today");
    const result = await apiClient.get("/tutor/schedules/schedule-today");
    console.log(result);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <UserHeader />

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        {/* <button onClick={handlePost}>TEST API AUTH</button> */}

        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Learn From Expert Teachers Anytime, Anywhere
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Book personalized lessons, chat with teachers, and join video
                  classes all in one platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/teachers">
                  <Button size="lg" className="gap-2">
                    Find Teachers
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students learning online"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width="550"
                height="310"
              />
              <div className="absolute -bottom-6 -right-6 bg-background rounded-lg shadow-lg p-4 hidden md:block">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  <span className="font-medium">Live Video Lessons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-t border-b bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by subject or teacher name"
                className="pl-10 w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {/* <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="language">Languages</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              {/* <div className="flex items-center gap-2">
                <Select defaultValue="any">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container px-4 md:px-6 py-8">
        <Tabs defaultValue="featured" className="w-full">
          {/* <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="featured">Featured Teachers</TabsTrigger>
              <TabsTrigger value="all">All Teachers</TabsTrigger>
              <TabsTrigger value="new">New Teachers</TabsTrigger>
            </TabsList>
            <Link to="/teachers">
              <Button variant="link">View All</Button>
            </Link>
          </div> */}

          <TabsContent value="featured" className="space-y-8">
            {/* Featured Teachers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <Card
                  key={tutor._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-0">
                    <div className="relative h-48 bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Avatar className="h-32 w-32 border-4 border-background">
                          <AvatarImage
                            src={tutor?.avatarUrl}
                            alt={tutor.username}
                          />
                          <AvatarFallback>
                            {tutor.fullname.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 text-center">
                    <CardTitle>{tutor.fullname}</CardTitle>
                    <CardDescription>
                      {tutor.skills.map((skill, index) => {
                        var st = skill.name;
                        if (index < tutor.skills.length - 1) {
                          st += " | ";
                        }
                        return st;
                      })}
                    </CardDescription>
                    {/* <div className="flex items-center justify-center mt-2 gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{teacher.rating}</span>
                    </div> */}
                    <div className="mt-2 flex items-center justify-center gap-2">
                      {/* <Badge
                        variant="outline"
                        className="flex gap-1 items-center"
                      >
                        <Clock className="h-3 w-3" />
                        {teacher.availableSlots} slots
                      </Badge> */}
                      {/* <Badge variant="secondary">${teacher.price}/hr</Badge> */}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      See certs
                    </Button> */}
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
          </TabsContent>

          <TabsContent value="all">
            <TeacherGrid />
          </TabsContent>

          <TabsContent value="new">
            <div className="text-center py-12">
              <p className="text-muted-foreground">New teachers coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="container my-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Lessons
              </CardTitle>
              <CardDescription>Your scheduled lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedules.map((lesson) => (
                  <ScheduleItemCard lesson={lesson} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground mt-2">
              Simple steps to start learning with expert teachers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Your Teacher</h3>
              <p className="text-muted-foreground">
                Browse profiles, read reviews, and find the perfect teacher for
                your needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Book a Lesson</h3>
              <p className="text-muted-foreground">
                Select an available time slot and make a secure payment to book
                your lesson.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Start Learning</h3>
              <p className="text-muted-foreground">
                Join your lesson via video call, chat with your teacher, and
                enhance your skills.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/signup">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="text-xl font-bold">
                SkillFlow
              </Link>
              <p className="text-muted-foreground mt-2">
                Learn from the best teachers around the world.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/teachers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Find Teachers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} LessonHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
