import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Calendar as CalendarIcon,
  MessageSquare,
  Settings,
  Video,
} from "lucide-react";

// Define a simple placeholder for ChatInterface until the actual component is available
const ChatInterface = ({ selectedTeacher = "", onBack = () => {} }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            Back
          </Button>
          <CardTitle>Chat with {selectedTeacher}</CardTitle>
          <div></div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[400px] flex items-center justify-center border rounded-md">
          <p className="text-muted-foreground">
            Chat messages will appear here
          </p>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-l-md border border-input bg-transparent px-3 py-2 text-sm"
          />
          <Button className="rounded-l-none">Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface Lesson {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface Message {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

interface DashboardProps {
  upcomingLessons?: Lesson[];
  pastLessons?: Lesson[];
  messages?: Message[];
}

const Dashboard = ({
  upcomingLessons = [
    {
      id: "1",
      teacherName: "Sarah Johnson",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      subject: "Mathematics",
      date: new Date(Date.now() + 86400000), // tomorrow
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      status: "upcoming",
    },
    {
      id: "2",
      teacherName: "Michael Chen",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      subject: "Physics",
      date: new Date(Date.now() + 172800000), // day after tomorrow
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      status: "upcoming",
    },
  ],
  pastLessons = [
    {
      id: "3",
      teacherName: "Emily Rodriguez",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      subject: "English Literature",
      date: new Date(Date.now() - 86400000), // yesterday
      startTime: "1:00 PM",
      endTime: "2:00 PM",
      status: "completed",
    },
    {
      id: "4",
      teacherName: "David Kim",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      subject: "Chemistry",
      date: new Date(Date.now() - 172800000), // day before yesterday
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      status: "completed",
    },
  ],
  messages = [
    {
      id: "1",
      teacherName: "Sarah Johnson",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastMessage: "Looking forward to our lesson tomorrow!",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unread: true,
    },
    {
      id: "2",
      teacherName: "Michael Chen",
      teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      lastMessage: "Don't forget to review the materials I sent.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unread: false,
    },
  ],
}: DashboardProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Find lessons for the selected date
  const lessonsForSelectedDate = [...upcomingLessons, ...pastLessons].filter(
    (lesson) => {
      if (!date) return false;
      return lesson.date.toDateString() === date.toDateString();
    },
  );

  const handleChatSelect = (messageId: string) => {
    setSelectedChat(messageId);
    setActiveTab("messages");
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              {messages.some((m) => m.unread) && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
              )}
            </Button>
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="messages">
                  Messages
                  {messages.some((m) => m.unread) && (
                    <Badge variant="destructive" className="ml-2">
                      {messages.filter((m) => m.unread).length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingLessons.length > 0 ? (
                  upcomingLessons.map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage
                                src={lesson.teacherAvatar}
                                alt={lesson.teacherName}
                              />
                              <AvatarFallback>
                                {lesson.teacherName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">
                                {lesson.subject} with {lesson.teacherName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {lesson.date.toLocaleDateString()} •{" "}
                                {lesson.startTime} - {lesson.endTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Join Lesson
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">
                        No upcoming lessons scheduled.
                      </p>
                      <Button className="mt-4">Browse Teachers</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastLessons.length > 0 ? (
                  pastLessons.map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage
                                src={lesson.teacherAvatar}
                                alt={lesson.teacherName}
                              />
                              <AvatarFallback>
                                {lesson.teacherName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">
                                {lesson.subject} with {lesson.teacherName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {lesson.date.toLocaleDateString()} •{" "}
                                {lesson.startTime} - {lesson.endTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              Review Lesson
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">
                        No past lessons found.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="messages">
                {selectedChat ? (
                  <ChatInterface
                    selectedTeacher={
                      messages.find((m) => m.id === selectedChat)
                        ?.teacherName || ""
                    }
                    onBack={() => setSelectedChat(null)}
                  />
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Card
                        key={message.id}
                        className={`cursor-pointer ${message.unread ? "border-primary" : ""}`}
                        onClick={() => handleChatSelect(message.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={message.teacherAvatar}
                                  alt={message.teacherName}
                                />
                                <AvatarFallback>
                                  {message.teacherName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium flex items-center">
                                  {message.teacherName}
                                  {message.unread && (
                                    <span className="ml-2 bg-primary w-2 h-2 rounded-full inline-block"></span>
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                                  {message.lastMessage}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Profile Information
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Update your personal information
                          </p>
                          <Button variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Payment Methods
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Manage your payment options
                          </p>
                          <Button variant="outline">
                            Manage Payment Methods
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />

                <div className="mt-6">
                  <h3 className="font-medium mb-2">
                    {date
                      ? date.toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </h3>
                  {lessonsForSelectedDate.length > 0 ? (
                    <div className="space-y-2">
                      {lessonsForSelectedDate.map((lesson) => (
                        <div key={lesson.id} className="p-2 border rounded-md">
                          <p className="font-medium">{lesson.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            {lesson.startTime} - {lesson.endTime}
                          </p>
                          <div className="flex items-center mt-1">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={lesson.teacherAvatar}
                                alt={lesson.teacherName}
                              />
                              <AvatarFallback>
                                {lesson.teacherName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">
                              {lesson.teacherName}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No lessons scheduled for this day.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Upcoming Lessons
                    </p>
                    <p className="text-2xl font-bold">
                      {upcomingLessons.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Completed Lessons
                    </p>
                    <p className="text-2xl font-bold">{pastLessons.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Unread Messages
                    </p>
                    <p className="text-2xl font-bold">
                      {messages.filter((m) => m.unread).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
