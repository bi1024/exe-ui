import {
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { skills } from "@/pages/tutor/skills/AddSkillForm";
import { useRef } from "react";
import TutorsList from "@/pages/student/components/TutorsList";
import { ITutor } from "./home";

interface Props {
  tutors: ITutor[];
  handleSearchClick: () => void;
  searchValue: string;
  handleSearchChange: (value: string) => void;
  skillSelect: string;
  handleSkillSelect: (value: string) => void;
}

export default function HeroSearch({
  tutors,
  handleSearchClick,
  searchValue,
  handleSearchChange,
  skillSelect,
  handleSkillSelect,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div>
      <section className="h-[40vh] bg-gradient-to-b from-white to-[#e5ebfb] flex flex-col items-center px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Find a <span className="text-[#3453B6]">teacher</span> that{" "}
          <span className="text-[#3453B6]">fits</span> you
        </h1>

        <div className="flex w-full h-14 max-w-xl rounded-full overflow-hidden shadow-lg bg-white mt-6">
          <div className="flex items-center pl-4 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          <Input
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="What do you want to look up?"
            className="h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xl"
          />
          <Button
            className="h-full rounded-none rounded-r-full px-6 text-white"
            style={{ backgroundColor: "#3453B6" }}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>

        <div className="w-[70%] h-20 mt-8 flex items-center gap-2 px-4">
          <ChevronLeft
            className="h-20 w-20 cursor-pointer text-[#3453B6]"
            onClick={scrollLeft}
          />

          <div
            ref={scrollRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-none px-2 py-2 bg-white/70 rounded-full max-w-full shadow scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {skills.map((skill, index) => {
              const isSelected = skill.name === skillSelect;

              return (
                <div
                  key={index}
                  className="flex items-center justify-center h-10 px-4 py-1 whitespace-nowrap text-base font-medium rounded-full cursor-pointer transition border"
                  style={{
                    backgroundColor: isSelected ? "#3453B6" : "#d9e0f9",
                    color: isSelected ? "#ffffff" : "#3453B6",
                    borderColor: isSelected ? "#3453B6" : "transparent",
                  }}
                  onClick={() => handleSkillSelect(skill.name)}
                >
                  {skill.name}
                </div>
              );
            })}
          </div>

          <ChevronRight
            className="h-20 w-20 cursor-pointer text-[#3453B6]"
            onClick={scrollRight}
          />
        </div>
      </section>
      <TutorsList tutors={tutors} handleSearchClick={handleSearchClick} />
    </div>
  );
}
