import apiClient from "@/api/apiClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Plus, Settings } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const skills = [
    { name: "Algebra" },
    { name: "Guitar" },
    { name: "Python Programming" },
    { name: "JavaScript" },
    { name: "Data Analysis" },
    { name: "Graphic Design" },
    { name: "UI/UX Design" },
    { name: "Project Management" },
    { name: "Communication" },
    { name: "Teamwork" },
    { name: "Problem Solving" },
    { name: "Critical Thinking" },
    { name: "Leadership" },
    { name: "Time Management" },
    { name: "English Language" }
];

export default function CreateSkill() {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    function handleOnChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleOnChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    function handleOnChangeCategory(category: string) {
        setCategory(category);
    }

    async function handleClickCreateSkill() {
        try {
            const categories = [category];
            const response = await apiClient.post('/skills', { name, description, categories });
            console.log(response);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                    <Link to="/" className="text-xl font-bold">
                        LessonHub
                    </Link>
                    <span className="text-sm font-medium text-muted-foreground">
                        Teacher Dashboard
                    </span>
                    </div>
                    <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden md:inline">Messages</span>
                        <Badge variant="secondary" className="ml-1">
                        2
                        </Badge>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="hidden md:inline">Settings</span>
                    </Button>
                    <div className="flex items-center gap-2">
                        <Avatar>
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
                        <AvatarFallback>TC</AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block">
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">
                            Mathematics Teacher
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
            {/* Header */}

            {/* Main Content */}
            <div className="flex flex-1 flex-col justify-start items-center bg-gray-50">
                <div className="w-[40%] p-8 flex flex-col gap-6 justify-center">
                    <div className="text-2xl font-semibold">Create a new Teaching Skill</div>
                    <div className="text-sm text-muted-foreground ">Share your expertise and let students book lectures with you. Add your skill below to get started.</div>

                    <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-base font-medium" htmlFor="skill-name">Skill Name</Label>
                            <Input 
                                placeholder="e.g. Algebra, Guitar Basics" 
                                name="skill-name" 
                                value={name} 
                                onChange={handleOnChangeName}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-base font-medium" htmlFor="skill-description">Description</Label>
                            <Textarea rows={5} 
                                placeholder="Describe what you'll teach, your approach, curriculum, and expected outcomes"
                                name="skill-description"
                                value={description}
                                onChange={handleOnChangeDescription}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-base font-medium">Skill Category</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Input className="text-left" value={category}/>
                                </DropdownMenuTrigger>

                                <DropdownMenuPortal>
                                    <DropdownMenuContent>
                                        {skills.map((skill) => {
                                            return (
                                                <DropdownMenuItem onSelect={() => handleOnChangeCategory(skill.name)}>{skill.name}</DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenuPortal>
                            </DropdownMenu>
                        </div>

                        <Button 
                            className="w-[40%] self-center flex flex-row gap-2"
                            onClick={handleClickCreateSkill}
                        >
                            <Plus size={16}/>
                            Create Skill
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    )
}