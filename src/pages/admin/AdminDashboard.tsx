import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import TrafficChart from "./components/TrafficChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import UserChart from "./components/UserChart";
import RevenueChart from "./components/RevenueChart";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [trafficData, setTrafficData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [profit, setProfit] = useState(0);
  const [revenueData, setRevenueData] = useState([]);

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
    const getProfitCount = async () => {
      const response = await apiClient.get("/utility/profit-count");
      console.log(response.data);
      // const [result] = response.data;
      // console.log(result.totalAmount);
      setProfit(response.data);
    };
    const getRevenueCount = async () => {
      const response = await apiClient.get("/utility/revenue-count");
      console.log(response.data);
      // const [result] = response.data;
      // console.log(result.totalAmount);
      setRevenueData(response.data);
    };
    getDailyTraffic();
    getDailyUserAggregate();
    getProfitCount();
    getRevenueCount();
  }, []);

  console.log(revenueData);

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
              <CardTitle>Account signups</CardTitle>
            </CardHeader>

            <CardContent>
              <UserChart userData={userData} />
            </CardContent>
          </Card>
        </div>
        <div className="mb-4 flex flex-row gap-4">
          <Card className="w-1/2 shadow-md border border-gray-200 bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Revenue
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-right text-2xl font-bold text-green-600">
                {profit}
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/2 shadow-md border border-gray-200 bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Revenue
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* <div className="text-right text-2xl font-bold text-green-600">
                {profit}
              </div> */}
              <CardContent>
                <RevenueChart revenueData={revenueData} />
              </CardContent>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
