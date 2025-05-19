import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import TeacherDashboard from "./components/TeacherDashboard";
import LessonInfoPage from "./components/LessonInfoPage";
import PaymentPage from "./components/PaymentPage";
import PaymentConfirmationPage from "./components/PaymentConfirmationPage";
import routes from "tempo-routes";
import AddSkillForm from "./pages/teacher/skills/AddSkillForm";
import SkillsList from "./pages/teacher/skills/SkillsList";
import EditSkillForm from "./pages/teacher/skills/EditSkillForm";
import AddSlotForm from "./pages/teacher/schedule/AddSlotForm";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      const data = { token, user };
      console.log(data);
      dispatch(setCredentials(data));
    }
  }, []);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/lesson/:lessonId" element={<LessonInfoPage />} />
          <Route path="/payment/:lessonId" element={<PaymentPage />} />
          <Route
            path="/payment-confirmation/:lessonId"
            element={<PaymentConfirmationPage />}
          />

          <Route
            path="/tutor/skills/list"
            element={<SkillsList/>}
          />

          <Route
            path='/tutor/skills/create' 
            element={<AddSkillForm/>}
          />

          <Route
            path="/tutor/skills/edit/:skillId"
            element={<EditSkillForm/>}
          />

          <Route
            path="/tutor/schedule"
            element={<AddSlotForm/>}
          />

        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
