import apiClient from "@/api/apiClient";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import { Book, CirclePlus, Edit, Plus, SquarePen, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export interface ISkillCategory {
    _id: string
    name: string
}

export interface ISkill {
    _id: string
    name: string
    description: string
    categories: ISkillCategory[]
}

export default function SkillsList() {

    const navigate = useNavigate();
    const [skills, setSkills] = useState<ISkill[]>(null);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const response = await apiClient.get('/tutor/skills');
                setSkills(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchSkills();
    }, []);


    async function handleClickCreateSkill() {
        navigate('/tutor/skills/create');
    }

    async function handleClickEditSkill(skillId: string) {
        navigate(`/tutor/skills/edit/${skillId}`);
    }

    async function handleClickDeleteSkill(skillId: string) {
        try {
            await apiClient.delete(`/tutor/skills/${skillId}`);
            const skillsFiltered = skills.filter(skill => skill._id !== skillId);
            setSkills(skillsFiltered);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header/>
            <div className="px-[4rem] py-7 bg-gray-50 w-full h-full">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4 items-center">
                        <div className="text-[#1F2937] text-[1.7rem] font-bold">My Skills</div>
                    </div>
                    <Button className="flex flex-row items-center gap-2" onClick={handleClickCreateSkill}>
                        <Plus/>
                        <div className="text-base" >New Skill</div>
                    </Button>
                </div>

                <div className="grid grid-cols-12 gap-8 flex-col mt-7">
                    {skills?.map((skill) => {
                        return (
                            <div className="col-span-3 bg-white rounded-lg p-4" key={skill._id}>
                                <div className="flex flex-row items-center justify-between">
                                    <a className="text-xl font-medium cursor-pointer hover:text-blue-600 hover:underline">{skill.name}</a>
                                    <div className="flex flex-row gap-2">
                                        <SquarePen size={20} className="cursor-pointer" onClick={() => handleClickEditSkill(skill._id)}/>
                                        <Trash2 size={20} className="cursor-pointer" onClick={() => handleClickDeleteSkill(skill._id)} />
                                    </div>
                                </div>
                                <div className="text-muted-foreground text-base h-[80px]">{skill.description ? skill.description : 'No description'}</div>
                                <div className="grid grid-cols-12 gap-3">
                                    {skill.categories?.map((category) => {
                                        return (
                                            <div className="col-span-6 rounded-md bg-[#F3F4F6] p-2 text-xs font-normal overflow-hidden text-ellipsis whitespace-nowrap flex justify-center items-center">
                                                {category.name}
                                            </div>
                                            
                                        )
                                    })}
                                </div>
                            </div>  
                        )
                    })}
                </div>
            </div>
        </div>
    )
}