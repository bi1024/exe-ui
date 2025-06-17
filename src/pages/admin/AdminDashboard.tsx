import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import TrafficChart from "./components/TrafficChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import UserChart from "./components/UserChart";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [trafficData, setTrafficData] = useState([]);
  const [userData, setUserData] = useState([]);

  function handleClickApproveTutors() {
    navigate("/admin/tutors-approval");
  }

  useEffect(() => {
    const getDailyTraffic = async () => {
      const response = await apiClient.get("/utility/daily-visit-count");
      console.log(response.data);
      setTrafficData(response.data);
    };
    const getDailyUserAggregate = async () => {
      const response = await apiClient.get("/utility/user-count");
      console.log(response.data);
      setUserData(response.data);
    };
    getDailyTraffic();
    getDailyUserAggregate();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <main className="container px-4 md:px-6 py-8">
        <div className="mb-4 flex flex-row gap-4">
          <Button onClick={handleClickApproveTutors}>Approve Tutors</Button>
        </div>
        <div className="mb-4 flex flex-row gap-4">
          <Card className="w-1/2 ">
            <CardHeader>
              <CardTitle>User traffic</CardTitle>
            </CardHeader>

            <CardContent>
              <TrafficChart visits={trafficData} />
            </CardContent>
          </Card>
          <Card className="w-1/2 ">
            <CardHeader>
              <CardTitle>Account count</CardTitle>
            </CardHeader>

            <CardContent>
              <UserChart userData={userData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
