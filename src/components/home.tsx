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

import { skills } from "@/pages/tutor/skills/AddSkillForm";
import { ISkill } from "@/pages/tutor/skills/SkillsList";
import HeroSearch from "./HeroSearch";

export interface ITutor {
  _id: string;
  image?: string;
  username: string;
  fullname: string;
  skills: ISkill[] | { name: string }[];
  hourlyRate: number;
  avatarUrl: string;
  ratingAverage?: number;
}

function IntroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
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
              <a href="#how-it-works">
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </a>
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
  );
}

function FeaturesSection() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-4 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6" id="how-it-works">
          How Skill Flow Works
        </h2>
      </section>

      {/* Step 1: Find Your Teacher */}
      <section className="bg-muted/40 py-16">
        <div className="container flex flex-col md:flex-row items-center gap-10">
          <img
            src="./find_teacher.png"
            alt="Find Your Teacher"
            className="w-full md:w-1/2 max-w-md hover:scale-105 transition-transform duration-300"
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">1. Find Your Teacher</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Browse tutor profiles, read reviews, and find the perfect teacher for your learning goals.
            </p>
            {/* <Button asChild>
              <Link to="/teachers">Find Now</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Step 2: Book a Lesson */}
      <section className="bg-background py-16">
        <div className="container flex flex-col md:flex-row-reverse items-center gap-10">
          <img
            src="./book_lesson.png"
            alt="Book a Lesson"
            className="w-full md:w-1/2 max-w-md hover:scale-105 transition-transform duration-300"
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">2. Book a Lesson</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Pick a time that works for you and reserve your lesson in seconds with secure payments.
            </p>
            {/* <Button asChild>
              <Link to="/schedule">Book a Lesson</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Step 3: Start Learning */}
      <section className="bg-muted/40 py-16">
        <div className="container flex flex-col md:flex-row items-center gap-10">
          <img
            src="./start_learning.png"
            alt="Start Learning"
            className="w-full md:w-1/2 max-w-md hover:scale-105 transition-transform duration-300"
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">3. Start Learning</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Join your video class, talk to your teacher, and improve your skills anytime, anywhere.
            </p>
            {/* <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  )
}

function BecomeTutorSection() {
  return (
    <section className="w-full flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-lg my-12">
      {/* Left: Image */}
      <div className="md:w-1/2 w-full h-80 md:h-auto">
        <img
          src="./become_tutor.png"
          alt="Tutor"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Content with gradient background */}
      <div
        className="md:w-1/2 w-full text-white p-8 flex flex-col justify-center bg-gradient-to-r from-[#3453B6] to-[#a5b4fc]"
      >
        <h2 className="text-4xl font-bold mb-4 leading-tight">Become a Tutor</h2>
        <p className="mb-6 text-lg">
          Share your expertise and teach students around the world. Join our platform and start tutoring online easily.
        </p>

        <ul className="list-disc list-inside space-y-2 font-medium">
          <li>Reach new students</li>
          <li>Grow your personal brand</li>
          <li>Get paid securely</li>
        </ul>

        <Button
          size="lg"
          className="mt-6 bg-white text-[#3453B6] hover:bg-gray-100 font-bold"
          asChild
        >
          <Link to="/register">Become a Tutor</Link>
        </Button>
      </div>
    </section>
  )
}

interface Review {
  id: number;
  teacherName: string;
  teacherImage: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    id: 1,
    teacherName: "Ms. Emma Johnson",
    teacherImage:
      "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment:
      "Ms. Emma is amazing! She made grammar so easy to understand. Highly recommend her!",
  },
  {
    id: 2,
    teacherName: "Mr. Daniel Tran",
    teacherImage:
      "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment:
      "Great at explaining tough math concepts. My test scores improved thanks to him.",
  },
  {
    id: 3,
    teacherName: "Ms. Sophia Lee",
    teacherImage:
      "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    comment:
      "Very kind and patient. My speaking skills have grown so much through our lessons.",
  },
];

function TeacherReviewsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What Students Say</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Feedback from students who learned with top-rated teachers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
            >
              <img
                src={review.teacherImage}
                alt={review.teacherName}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary"
              />
              <h3 className="text-lg font-semibold mb-1">{review.teacherName}</h3>

              {/* Stars */}
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground italic text-sm">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [tutors, setTutors] = useState<ITutor[]>([]);
  const [schedules, setSchedules] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ws } = useContext(RoomContext);
  function createRoom() {
    ws.emit("create-room");
  }

  const [searchFilter, setSearchFilter] = useState<string>("");
  // const [searchFilter, setSearchFilter] = useState<string>('');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<string>("all");
  const [minPriceFilter, setMinPriceFilter] = useState<number | "">("");
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | "">("");

  useEffect(() => {
    if (user?.role === "tutor") {
      navigate("/tutor/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
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
        setSchedules(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    async function logVisit() {
      try {
        apiClient.get("/utility/log-visit");
      } catch (err) {
        console.log(err);
      }
    }

    fetchTutors();
    fetchSchedules();
    logVisit();
  }, []);

  const renderRatingSection = (rating: number) => {
    const arr = [1, 2, 3, 4, 5];
    return (
      <div className="flex flex-row gap-2">
        {arr.map((e) => (
          <Star fill={e <= rating ? "yellow" : "white"} />
        ))}
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };

  const handlePost = async () => {
    // const result = await apiClient.post("/tutor/schedules/schedule-today");
    const result = await apiClient.get("/tutor/schedules/schedule-today");
    console.log(result);
  };

  const handleSkillSelect = (value: string) => {
    setSkillCategoryFilter(value);

    const filterQuery = `skillCategory=${value}`;

    async function fetchTutorsFiltered() {
      try {
        const response = await apiClient.get(
          `/student/tutors-filter/?${filterQuery}`
        );
        const tutors = response.data.data;
        setTutors(tutors);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTutorsFiltered();
  };

  const handleSearchChange = (value: string) => {
    setSearchFilter(value);
  };

  const handleOnChangeMinPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (!value) setMinPriceFilter("");
    else if (/^\d*$/.test(value)) {
      setMinPriceFilter(parseInt(value));
    }
  };

  const handleOnChangeMaxPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (!value) setMaxPriceFilter("");
    else if (/^\d*$/.test(value)) {
      setMaxPriceFilter(parseInt(value));
    }
  };

  const filter = () => {
    const filterQuery = `search=${searchFilter}&skillCategory=${skillCategoryFilter}&minPrice=${minPriceFilter}&maxPrice=${maxPriceFilter}`;

    async function fetchTutorsFiltered() {
      try {
        const response = await apiClient.get(
          `/student/tutors-filter/?${filterQuery}`
        );
        const tutors = response.data.data;
        setTutors(tutors);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTutorsFiltered();
  };

  const handleOnClickReview = () => {
    navigate("/student/review");
  };

  return (
    <div className="min-h-screen bg-background">
      <UserHeader />

      <IntroSection />

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <HeroSearch
          tutors={tutors}
          handleSearchClick={filter}
          searchValue={searchFilter}
          handleSearchChange={handleSearchChange}
          skillSelect={skillCategoryFilter}
          handleSkillSelect={handleSkillSelect}
        />
      </section>

      {/* Main Content */}
      <main className="container px-4 md:px-6 py-8">
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

          <Button className="mt-6" onClick={handleOnClickReview}>
            Let's Review some tutors !
          </Button>
        </div>
      </main>

      <TeacherReviewsSection />

      <FeaturesSection />

      <BecomeTutorSection />

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
                  <a
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    How It Works
                  </a>
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
