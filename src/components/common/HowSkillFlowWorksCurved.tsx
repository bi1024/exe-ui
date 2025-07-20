import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const StepItem = ({
  step,
  title,
  description,
  side = "left",
}: {
  step: number;
  title: string;
  description: string;
  side?: "left" | "right";
}) => {
  const isLeft = side === "left";

  return (
    <div className="relative flex items-center justify-between w-full">
      {/* Left side */}
      {isLeft && (
        <>
          <div className="flex flex-col items-end w-1/2 pr-4">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="relative flex items-center justify-center w-20">
            <div className="w-1 bg-muted absolute top-0 bottom-0 z-0" />
            <div className="z-10 bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow">
              {step}
            </div>
          </div>
          <div className="w-1/2" />
        </>
      )}

      {/* Right side */}
      {!isLeft && (
        <>
          <div className="w-1/2" />
          <div className="relative flex items-center justify-center w-20">
            <div className="w-1 bg-muted absolute top-0 bottom-0 z-0" />
            <div className="z-10 bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow">
              {step}
            </div>
          </div>
          <div className="flex flex-col items-start w-1/2 pl-4">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

const HowSkillFlowWorksCurved = () => {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        How Skill Flow Works
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
        A step-by-step learning journey from choosing your mentor to getting
        personalized feedback — all on one interactive platform.
      </p>

      <div className="flex flex-col space-y-24 relative">
        <StepItem
          step={1}
          title="Choose Your Mentor"
          description="Browse our mentor profiles and select someone whose expertise aligns with your goals."
          side="left"
        />
        <StepItem
          step={2}
          title="Try a Free Trial Class"
          description="Get a taste of our live learning experience for free — ask questions, interact, and see if the vibe fits."
          side="right"
        />
        <StepItem
          step={3}
          title="Purchase Your Course"
          description="Ready to commit? Secure your spot by purchasing the course directly on Skill Flow."
          side="left"
        />
        <StepItem
          step={4}
          title="Align Your Goals"
          description="Have a short onboarding session with your mentor to discuss your current skill level and what you aim to achieve."
          side="right"
        />
        <StepItem
          step={5}
          title="Join Live Classes on Skill Flow"
          description="No Zoom, no switching apps. Learn live, ask questions, and engage — all within the Skill Flow platform."
          side="left"
        />
        <StepItem
          step={6}
          title="Practice & Receive Feedback"
          description="Complete hands-on tasks after each session and get 1-on-1 feedback to fast-track your progress."
          side="right"
        />
        <StepItem
          step={7}
          title="Rate Your Mentor"
          description="After your journey ends, leave a review to help others and maintain top-quality learning for all."
          side="left"
        />
      </div>
    </section>
  );
};

export default HowSkillFlowWorksCurved;
