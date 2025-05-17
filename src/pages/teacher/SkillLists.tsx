import axios from "axios";
import { useEffect, useState } from "react"

export interface ISkill {
    name: string
    description: string
    categories?: string[]
}

export default function SkillLists() {

    const [skills, setSkills] = useState<ISkill[]>(null);

    useEffect(() => {
        async function fetchSkills() {
            const skills = await axios.get('/skills');
            setSkills(skills.data);
        }

        try {
            fetchSkills();
        } catch(err) {
            console.log(err);
        }

    }, []);

    console.log(skills)
    return (
        <div>Skills</div>
    )
}