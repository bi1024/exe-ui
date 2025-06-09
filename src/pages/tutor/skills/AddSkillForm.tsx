import apiClient from "@/api/apiClient";
import Header from "@/components/layouts/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Plus, Settings } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SkillCategoriesList from "./components/SkillCategoriesList";

export const skills = [
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

// function getCategoriesFormatted(categories: string[]) : string {
//     if(!categories.length) return '';
//     let result : string = categories[0];
//     for(let i = 1; i < categories.length; ++i) {
//         result += `, ${categories[i]}`;
//     }
//     return result;
// }

export default function AddSkillForm() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    // const [categories, setCategories] = useState<string[]>([]);

    function handleOnChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleOnChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    function handleOnChangeCategory(category: string) {
        setCategory(category);
        // setCategories([...categories, category]);
    }

    async function handleClickCreateSkill() {
        try {
            const categories = [category];
            await apiClient.post('/tutor/skills', { name, description, categories });
            navigate('/tutor/skills/list');
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header/>

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
                            <SkillCategoriesList category={category} handleOnChangeCategory={handleOnChangeCategory} />
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