import apiClient from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { CertificatesModal } from "../components/CertificatesModal";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog";

export interface ICert {
    _id: string
    tutor: string;
    name: string;
    description: string;
    imageUrl: string;
}

interface ITutor {
    _id: string
    username: string
    fullname: string
    email: string
    phone: string
    hourlyRate: number
    certifications: ICert[]
}

const TutorsApproval = () => {

    const [tutorsPending, setTutorsPending] = useState<ITutor[]>([]);
    const [showingImage, setShowingImage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTutorsPending() {
            try {
                const response = await apiClient.get('/admin/tutors/pending');
                setTutorsPending(response.data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchTutorsPending();
    }, []);

    async function handleClickApprove(userId: string) {
        try {
            await apiClient.put('/admin/tutors/approving', { userId });
            const tutors = tutorsPending.filter(tutor => tutor._id !== userId);
            setTutorsPending(tutors);
        } catch(err) {
            console.log(err);
        }
    }

    const handleDeleteCert = async (_id) => {
        // console.log(_id);
        // setCertifications(certifications.filter((e) => e._id !== _id));
        // const result = await apiClient.delete(`/tutor/certs/${_id}`);
  };

    function renderCertifications(certifications : ICert[]) {
        return (
            <div>
                {certifications.map(cert => {
                    return (
                        <div
                            key={cert._id}
                            className="min-w-[200px] bg-white rounded-xl shadow p-4 flex-shrink-0 mb-3"
                        >
                            <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">
                                {cert.description}
                            </p>

                            <Dialog>
                                <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="text-xs"
                                    onClick={() => setShowingImage(cert.imageUrl)}
                                >
                                    View Image
                                </Button>
                                </DialogTrigger>

                                <DialogPortal>
                                    <DialogOverlay className="bg-white/60 fixed inset-0"/>
                                    <DialogContent className="max-w-lg z-[1002]">
                                    <img
                                        src={showingImage ?? ""}
                                        alt="Certification"
                                        className="w-full h-auto rounded"
                                    />
                                    </DialogContent>
                                </DialogPortal>

                            </Dialog>
                        </div>                        
                    )
                })}                
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-8">
        <Card>
            <CardHeader>
            <CardTitle>Tutors Approval</CardTitle>
            <CardDescription>
                Approving tutors by clicking 'Approve'
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Fullname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Hourly Rate</TableHead>
                    <TableHead>Certificates</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {tutorsPending.map(tutor => {
                        return (
                            <TableRow key={tutor.username}>
                                <TableCell>{tutor.username}</TableCell>
                                <TableCell>{tutor.fullname}</TableCell>
                                <TableCell>{tutor.email}</TableCell>
                                <TableCell>{tutor.phone}</TableCell>
                                <TableCell>{tutor.hourlyRate}</TableCell>
                                <TableCell>
                                    <CertificatesModal
                                        trigger={
                                            <Button variant="ghost">
                                                <Eye/>
                                            </Button>
                                        }   
                                        title={`${tutor.username}'s certificates`}
                                        body={
                                            renderCertifications(tutor.certifications)
                                        }
                                    />
                                </TableCell>
                                <TableCell className="w-2">
                                    <Button variant="destructive" onClick={() => handleClickApprove(tutor._id)}>Approve</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            </CardContent>
            <CardFooter>
            <div className="text-xs text-muted-foreground">
                List of Pending Tutors
            </div>
            </CardFooter>
        </Card>
        </div>
    );
};

export default TutorsApproval;