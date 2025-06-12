import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();

    function handleClickApproveTutors() {
        navigate('/admin/tutors-approval');
    }

    return (
        <div className="flex flex-col">
            <Header/>
            <main className="container px-4 md:px-6 py-8">
                <div className="mb-4 flex flex-row gap-4">
                    <Button onClick={handleClickApproveTutors}>Approve Tutors</Button>
                </div>
            </main>
        </div>
    )
}