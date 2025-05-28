import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import {
  Calendar as CalendarIcon,
  MessageSquare,
  Video,
  Users,
  Settings,
  Clock,
  DollarSign,
  Star,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import ScheduleItemForTutorCard from "@/pages/tutor/schedule/components/ScheduleItemForTutorCard";
import apiClient from "@/api/apiClient";

const TutorDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [upcomingLessons, setUpcomingLessons] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/");
  };

  // Mock data
  // const upcomingLessons = [
  //   {
  //     id: 1,
  //     studentName: "Alex Johnson",
  //     subject: "Mathematics",
  //     date: "Today",
  //     time: "3:00 PM - 4:00 PM",
  //     status: "confirmed",
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  //   },
  //   {
  //     id: 2,
  //     studentName: "Emma Wilson",
  //     subject: "Physics",
  //     date: "Tomorrow",
  //     time: "1:00 PM - 2:30 PM",
  //     status: "confirmed",
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  //   },
  //   {
  //     id: 3,
  //     studentName: "Michael Brown",
  //     subject: "Mathematics",
  //     date: "May 20, 2023",
  //     time: "5:00 PM - 6:00 PM",
  //     status: "pending",
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  //   },
  // ];

  // const recentMessages = [
  //   {
  //     id: 1,
  //     name: "Alex Johnson",
  //     message: "Hi, I have a question about tomorrow's lesson...",
  //     time: "10 min ago",
  //     unread: true,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  //   },
  //   {
  //     id: 2,
  //     name: "Emma Wilson",
  //     message: "Thanks for the homework review!",
  //     time: "2 hours ago",
  //     unread: false,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  //   },
  // ];

  // const stats = [
  //   {
  //     title: "Total Students",
  //     value: "24",
  //     icon: <Users className="h-4 w-4" />,
  //   },
  //   {
  //     title: "Completed Lessons",
  //     value: "156",
  //     icon: <Clock className="h-4 w-4" />,
  //   },
  //   {
  //     title: "Earnings This Month",
  //     value: "$1,240",
  //     icon: <DollarSign className="h-4 w-4" />,
  //   },
  //   {
  //     title: "Average Rating",
  //     value: "4.9",
  //     icon: <Star className="h-4 w-4" />,
  //   },
  // ];

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await apiClient.get(
          "/tutor/schedules/tutor-schedule-today"
        );
        console.log("res", response.data);
        setUpcomingLessons(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchSchedules();
  }, []);

  function handleClickListSkills() {
    navigate("/tutor/skills/list");
  }

  function handleClickEditSchedule() {
    navigate("/tutor/schedule");
  }

  function handleClickPricing() {
    navigate("/tutor/pricing");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold">
              SkillFlow
            </Link>
            <span className="text-sm font-medium text-muted-foreground">
              Teacher Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">Messages</span>
              <Badge variant="secondary" className="ml-1">
                2
              </Badge>
            </Button> */}
            {/* <Button variant="ghost" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </Button> */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Log out</span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                {/* <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" /> */}
                <AvatarFallback>{user?.email.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.email}</p>
                {/* <p className="text-xs text-muted-foreground">
                  Mathematics Teacher
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 md:px-6 py-8">
        {/* <Button
          variant="outline"
          onClick={() => {
            navigate("/tutor/schedule");
          }}
        >
          Add schedule
        </Button> */}
        <div className="mb-4 flex flex-row gap-4">
          <Button
            className="flex flex-row gap-2"
            onClick={handleClickListSkills}
          >
            Show my skills
          </Button>
          <Button onClick={handleClickEditSchedule}>Edit my schedule</Button>
          <Button>Certifications</Button>
          <Button onClick={handleClickPricing}>Pricing</Button>
        </div>
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {/* Calendar */}
          {/* <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar
              </CardTitle>
              <CardDescription>Manage your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
              />
            </CardContent>
          </Card> */}

          {/* Upcoming Lessons */}
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
                {upcomingLessons.map((lesson) => (
                  // <div
                  //   key={lesson.id}
                  //   className="flex items-center gap-4 p-3 rounded-lg border"
                  // >
                  //   <Avatar>
                  //     <AvatarImage src={lesson.image} />
                  //     <AvatarFallback>
                  //       {lesson.studentName
                  //         .split(" ")
                  //         .map((n) => n[0])
                  //         .join("")}
                  //     </AvatarFallback>
                  //   </Avatar>
                  //   <div className="flex-1">
                  //     <div className="flex items-center justify-between">
                  //       <p className="font-medium">{lesson.studentName}</p>
                  //       {/* <Badge
                  //         variant={
                  //           lesson.status === "confirmed"
                  //             ? "outline"
                  //             : "secondary"
                  //         }
                  //       >
                  //         {lesson.status === "confirmed"
                  //           ? "Confirmed"
                  //           : "Pending"}
                  //       </Badge> */}
                  //     </div>
                  //     <p className="text-sm text-muted-foreground">
                  //       {lesson.subject}
                  //     </p>
                  //     <div className="flex items-center gap-2 mt-1 text-sm">
                  //       <span>{lesson.date}</span>
                  //       <span>•</span>
                  //       <span>{lesson.time}</span>
                  //     </div>
                  //   </div>
                  //   <div className="flex gap-2">
                  //     {/* <Button
                  //       size="sm"
                  //       variant="outline"
                  //       className="h-8 w-8 p-0"
                  //     >
                  //       <MessageSquare className="h-4 w-4" />
                  //     </Button> */}
                  //     <Button size="sm" className="h-8 w-8 p-0">
                  //       <Video className="h-4 w-4" />
                  //     </Button>
                  //   </div>
                  // </div>
                  <ScheduleItemForTutorCard lesson={lesson} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Messages and Content Tabs
        <div className="mt-6">
          <Tabs defaultValue="messages">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="content">My Content</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            <TabsContent value="messages" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Respond to your students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div
                        key={message.id}
                        className="flex items-start gap-4 p-3 rounded-lg border"
                      >
                        <Avatar>
                          <AvatarImage src={message.image} />
                          <AvatarFallback>
                            {message.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{message.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {message.time}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{message.message}</p>
                        </div>
                        {message.unread && (
                          <Badge className="bg-primary h-2 w-2 rounded-full p-0" />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Messages
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="content" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Content</CardTitle>
                  <CardDescription>
                    Manage your teaching materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Content management coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="earnings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings</CardTitle>
                  <CardDescription>Track your income</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Earnings dashboard coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div> */}
      </main>
    </div>
  );
};

export default TutorDashboard;
