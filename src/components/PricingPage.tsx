import React, { useEffect, useState } from "react";
import Header from "./layouts/Header";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import apiClient from "@/api/apiClient";
import { useNavigate } from "react-router";

const PricingPage = () => {
  const [hourlyRate, setHourlyRate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getHourlyRate = async () => {
      const result = await apiClient.get("/tutor/hourly-rate");
      // console.log(result.data.data?.hourlyRate || 0);
      setHourlyRate(result.data.data?.hourlyRate || 0);
      // return result;
    };
    getHourlyRate();
  }, []);

  const handleOnChangeRate = (e) => {
    console.log(e.target.value);
    setHourlyRate(e.target.value);
  };

  const handleUpdateRate = async () => {
    const result = await apiClient.post("/tutor/hourly-rate", {
      hourlyRate: hourlyRate,
    });
    console.log(result);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-start items-center bg-gray-50">
        <Button
          className="bg-[#358EDD] border-0 p-2.5 cursor-pointer text-white mx-2"
          onClick={() => {
            navigate("/tutor/dashboard");
          }}
        >
          Back
        </Button>
        <div className="w-[40%] p-8 flex flex-col gap-6 justify-center">
          <div className="text-2xl font-semibold">Enter your hourly rate</div>
          <div className="text-sm text-muted-foreground "></div>

          <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
            <div className="w-full flex flex-col gap-2">
              <Label className="text-base font-medium" htmlFor="skill-name">
                Hourly rate
              </Label>
              <Input
                placeholder="e.g. 100000"
                name="skill-name"
                type="number"
                value={hourlyRate}
                onChange={handleOnChangeRate}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              {/* <Label
                className="text-base font-medium"
                htmlFor="skill-description"
              >
                Description
              </Label> */}
              {/* <Textarea
                rows={5}
                placeholder="Describe what you'll teach, your approach, curriculum, and expected outcomes"
                name="skill-description"
                value={description}
                onChange={handleOnChangeDescription}
              /> */}
            </div>

            <Button
              className="w-[40%] self-center flex flex-row gap-2"
              onClick={handleUpdateRate}
            >
              {/* <Plus size={16} /> */}
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
