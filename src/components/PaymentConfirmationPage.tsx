import { useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  Download,
  MessageCircle,
} from "lucide-react";

export default function PaymentConfirmationPage() {
  const { lessonId } = useParams();

  // Mock lesson data
  const lesson = {
    id: lessonId || "lesson-123",
    title: "Advanced JavaScript Concepts",
    price: 45,
    duration: 60,
    date: "June 15, 2023",
    time: "10:00 AM",
    confirmationNumber:
      "CONF-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    teacher: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">
            Your lesson has been booked successfully.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Confirmation</CardTitle>
            <p className="text-sm text-gray-500">
              Confirmation #{lesson.confirmationNumber}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-lg">{lesson.title}</h3>
              <div className="flex items-center mt-1">
                <img
                  src={lesson.teacher.avatar}
                  alt={lesson.teacher.name}
                  className="h-6 w-6 rounded-full mr-2"
                />
                <span className="text-gray-600">{lesson.teacher.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-gray-600">
                    {lesson.date} at {lesson.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-gray-600">{lesson.duration} minutes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Video className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Lesson Format</p>
                  <p className="text-gray-600">Online Video Call</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Payment Details</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Lesson Price</span>
                  <span>${lesson.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>$2.00</span>
                </div>
                <div className="flex justify-between font-medium mt-2">
                  <span>Total Paid</span>
                  <span>${(lesson.price + 2).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Next Steps</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>
                    Check your email for a detailed confirmation and calendar
                    invite.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>
                    Review any preparation materials provided by your teacher.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>
                    Join the lesson on time using the link that will be sent to
                    you.
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto" asChild>
              <Link to="/dashboard">
                <Calendar className="mr-2 h-4 w-4" />
                View in Calendar
              </Link>
            </Button>

            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link
                to={`/chat/${lesson.teacher.name.toLowerCase().replace(" ", "-")}`}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Teacher
              </Link>
            </Button>

            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center mt-8">
          <Button variant="link" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
