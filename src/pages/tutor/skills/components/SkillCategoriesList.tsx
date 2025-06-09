import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { skills } from "../AddSkillForm";

interface Props {
    category: string
    handleOnChangeCategory: (name: string) => void
}

export default function SkillCategoriesList({ category, handleOnChangeCategory } : Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Input className="text-left" value={category}/>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
                <DropdownMenuContent>
                    {skills.map((skill) => {
                        return (
                            <DropdownMenuItem key={skill.name} onSelect={() => handleOnChangeCategory(skill.name)}>{skill.name}</DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    )
}