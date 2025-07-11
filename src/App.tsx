import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import TutorDashboard from "./components/TutorDashboard";
import LessonInfoPage from "./components/LessonInfoPage";
import PaymentPage from "./components/PaymentPage";
import PaymentConfirmationPage from "./components/PaymentConfirmationPage";
import routes from "tempo-routes";
import AddSkillForm from "./pages/tutor/skills/AddSkillForm";
import SkillsList from "./pages/tutor/skills/SkillsList";
import EditSkillForm from "./pages/tutor/skills/EditSkillForm";
import EditSlotsForm from "./pages/tutor/schedule/EditSlotsForm";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/slices/authSlice";
import BookingForm from "./pages/student/booking/BookingForm";
import PaymentFailedPage from "./components/PaymentFailedPage";
import StartMeetingPage from "./pages/common/room/StartMeetingPage";
import Room from "./pages/common/room/RoomV2";
import { RoomProvider } from "./context/RoomContext";
import Dashboard from "./components/Dashboard";
import PricingPage from "./components/PricingPage";
import TutorCertificationsPage from "./components/TutorCertificationsPage";
import Profile from "./pages/common/Profile";
import TutorsApproval from "./pages/admin/tutors-approval/TutorsApproval";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ReceiptsPage from "./components/ReceiptsPage";
import { TutorReview } from "./pages/student/review/TutorReview";
import { TutorDetails } from "./pages/student/tutorDetails/TutorDetails";
import HeroSearch from "./components/HeroSearch";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      const data = { token, user };
      console.log(data);
      dispatch(setCredentials(data));
    }
    if (user?.role === "tutor") {
      // navigate("/tutor/dashboard");//todo:check othe methods
    }
  }, []);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutor/dashboard" element={<TutorDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lesson/:lessonId" element={<LessonInfoPage />} />
          <Route path="/payment/:lessonId" element={<PaymentPage />} />
          <Route path="/receipts" element={<ReceiptsPage />} />
          <Route
            path="/payment-confirmation"
            element={<PaymentConfirmationPage />}
          />
          <Route path="/payment-failed" element={<PaymentFailedPage />} />
          <Route path="/tutor/skills/list" element={<SkillsList />} />
          <Route path="/tutor/skills/create" element={<AddSkillForm />} />
          <Route path="/tutor/pricing" element={<PricingPage />} />
          <Route
            path="/tutor/skills/edit/:skillId"
            element={<EditSkillForm />}
          />
          <Route path="/tutor/schedule" element={<EditSlotsForm />} />
          <Route
            path="/tutor/certifications"
            element={<TutorCertificationsPage />}
          />
          <Route path="/student/booking/:tutorId" element={<BookingForm />} />
          <Route path="/start-meeting" element={<StartMeetingPage />} />
          <Route path="/room/:id" element={<Room />} />

          {/* Routes for Admin pages */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tutors-approval" element={<TutorsApproval />} />
          <Route path="/student/review" element={<TutorReview />} />
          <Route path="/student/tutor-details/:tutorId" element={<TutorDetails />} />
        </Routes>

        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
