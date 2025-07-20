import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UserHeader from "./UserHeader";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    inquiryType: "freeTrial", // Default selected radio button
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, inquiryType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., send data to an API
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data."); // Using alert for demo, replace with proper UI feedback
    // You might want to clear the form or show a success message
  };

  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl w-full space-y-12">
          {/* Part 1: Contact Skill Flow */}
          <Card className="w-full rounded-lg shadow-lg p-8 bg-white">
            <CardHeader className="text-center mb-6">
              <CardTitle className="text-3xl font-extrabold text-gray-900 mb-2">
                Contact Skill Flow
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Looking for support, collaboration, or partnership opportunities
                with Skill Flow? Select the option that best fits your needs to
                get connected faster.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                I’m a Learner / Parent
              </Button>
              <Button className="w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                I’m an Educator / Center / Organization
              </Button>
              <Button className="w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                I want to Partner or Sponsor
              </Button>
            </CardContent>
          </Card>

          {/* Part 2: Ready to Level Up Your Creative Skills? */}
          <Card className="w-full rounded-lg shadow-lg p-8 bg-white">
            <CardHeader className="text-center mb-6">
              <CardTitle className="text-3xl font-extrabold text-gray-900 mb-2">
                Ready to Level Up Your Creative Skills?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Thousands of learners have grown their skills and landed real
                opportunities with Skill Flow's personalized, real-time learning
                experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password Input */}
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Radio Buttons */}
                <RadioGroup
                  value={formData.inquiryType}
                  onValueChange={handleRadioChange}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="freeTrial" id="freeTrial" />
                    <Label
                      htmlFor="freeTrial"
                      className="text-base text-gray-800"
                    >
                      Join a Free Trial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="talkToAdvisors"
                      id="talkToAdvisors"
                    />
                    <Label
                      htmlFor="talkToAdvisors"
                      className="text-base text-gray-800"
                    >
                      Talk to Our Advisors
                    </Label>
                  </div>
                </RadioGroup>

                {/* Submit Button (Optional, you might want a dedicated submit button) */}
                <Button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 mt-6"
                >
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
