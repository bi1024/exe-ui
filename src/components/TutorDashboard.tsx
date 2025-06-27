import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Clock } from "lucide-react";
import ScheduleItemForTutorCard from "@/pages/tutor/schedule/components/ScheduleItemForTutorCard";
import apiClient from "@/api/apiClient";
import Header from "./layouts/Header";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const TutorDashboard = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  if (!user || user.role !== "tutor") {
    navigate("/login");
  } else if (user.status === "pending") {
    return <Header />;
  }

  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [tutorProfile, setTutorProfile] = useState<any>({});

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

    const fetchTutor = async () => {
      try {
        const response = await apiClient.get("/profile/myProfile");
        console.log("res", response.data);
        setTutorProfile(response.data);
        // setUpcomingLessons(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTutor();

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

  function handleClickCertifications() {
    navigate("/tutor/certifications");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

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
          <Button onClick={handleClickCertifications}>Certifications</Button>
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
          <div className="mb-4 flex flex-row gap-4">
            <Card className="w-[100%] shadow-md border border-gray-200 bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Balance
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-right text-2xl font-bold text-green-600">
                  {tutorProfile.accountBalance}
                </div>
              </CardContent>
            </Card>
          </div>
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
