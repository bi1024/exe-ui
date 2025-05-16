import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Star } from "lucide-react";
import TeacherCard from "./TeacherCard";

interface TeacherGridProps {
  teachers?: Teacher[];
}

interface Teacher {
  id: string;
  name: string;
  profileImage: string;
  specialization: string;
  rating: number;
  pricePerHour: number;
  availableSlots: string[];
}

const TeacherGrid = ({ teachers = [] }: TeacherGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<string>("0");
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const mockTeachers: Teacher[] =
    teachers.length > 0
      ? teachers
      : [
          {
            id: "1",
            name: "Sarah Johnson",
            profileImage:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
            specialization: "Mathematics",
            rating: 4.8,
            pricePerHour: 45,
            availableSlots: ["Mon 2:00 PM", "Wed 4:00 PM", "Fri 10:00 AM"],
          },
          {
            id: "2",
            name: "David Chen",
            profileImage:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
            specialization: "Physics",
            rating: 4.9,
            pricePerHour: 50,
            availableSlots: ["Tue 1:00 PM", "Thu 3:00 PM", "Sat 11:00 AM"],
          },
          {
            id: "3",
            name: "Maria Rodriguez",
            profileImage:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
            specialization: "English Literature",
            rating: 4.7,
            pricePerHour: 40,
            availableSlots: ["Mon 10:00 AM", "Wed 2:00 PM", "Fri 4:00 PM"],
          },
          {
            id: "4",
            name: "James Wilson",
            profileImage:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
            specialization: "Chemistry",
            rating: 4.6,
            pricePerHour: 48,
            availableSlots: ["Tue 9:00 AM", "Thu 1:00 PM", "Sat 3:00 PM"],
          },
          {
            id: "5",
            name: "Emma Thompson",
            profileImage:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
            specialization: "History",
            rating: 4.5,
            pricePerHour: 38,
            availableSlots: ["Mon 3:00 PM", "Wed 11:00 AM", "Fri 2:00 PM"],
          },
          {
            id: "6",
            name: "Michael Brown",
            profileImage:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
            specialization: "Computer Science",
            rating: 4.9,
            pricePerHour: 55,
            availableSlots: ["Tue 4:00 PM", "Thu 10:00 AM", "Sat 1:00 PM"],
          },
        ];

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English Literature",
    "History",
    "Computer Science",
    "Foreign Languages",
  ];

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  const filteredTeachers = mockTeachers.filter((teacher) => {
    // Search filter
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    // Price filter
    const matchesPrice =
      teacher.pricePerHour >= priceRange[0] &&
      teacher.pricePerHour <= priceRange[1];

    // Subject filter
    const matchesSubject =
      selectedSubjects.length === 0 ||
      selectedSubjects.includes(teacher.specialization);

    // Rating filter
    const matchesRating = teacher.rating >= parseInt(minRating);

    return matchesSearch && matchesPrice && matchesSubject && matchesRating;
  });

  return (
    <div className="w-full bg-background p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Find Your Perfect Teacher</h2>

        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="bg-muted/30 p-4 rounded-md mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price range filter */}
            <div>
              <Label className="mb-2 block">Price Range ($/hour)</Label>
              <div className="flex items-center gap-4">
                <span>${priceRange[0]}</span>
                <Slider
                  value={priceRange}
                  min={0}
                  max={200}
                  step={5}
                  onValueChange={setPriceRange}
                  className="flex-grow"
                />
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Subject filter */}
            <div>
              <Label className="mb-2 block">Subject</Label>
              <Select
                value={selectedSubjects.length === 1 ? selectedSubjects[0] : ""}
                onValueChange={(value) => {
                  if (value) {
                    setSelectedSubjects([value]);
                  } else {
                    setSelectedSubjects([]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating filter */}
            <div>
              <Label className="mb-2 block">Minimum Rating</Label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability filter - simplified for UI scaffolding */}
            <div>
              <Label className="mb-2 block">Availability</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekdays" />
                  <label htmlFor="weekdays" className="text-sm">
                    Weekdays
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekends" />
                  <label htmlFor="weekends" className="text-sm">
                    Weekends
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evenings" />
                  <label htmlFor="evenings" className="text-sm">
                    Evenings
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          {filteredTeachers.length} teachers found
        </p>
      </div>

      {/* Teacher grid */}
      {filteredTeachers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              id={teacher.id}
              name={teacher.name}
              profileImage={teacher.profileImage}
              specialization={teacher.specialization}
              rating={teacher.rating}
              pricePerHour={teacher.pricePerHour}
              availableSlots={teacher.availableSlots}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            No teachers match your search criteria
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setPriceRange([0, 100]);
              setSelectedSubjects([]);
              setMinRating("0");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeacherGrid;
