import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ICert } from "@/pages/admin/tutors-approval/TutorsApproval";

interface Props {
    certifications: ICert[]
    showingImage: string
    setShowingImage: (imageUrl: string) => void
}

export function TutorCertificates({ certifications, showingImage, setShowingImage } : Props) {
    return (
        <div className="flex flex-col gap-4">
            {certifications?.map((cert) => (
                <div
                key={cert._id}
                className="min-w-[200px] bg-white rounded-xl shadow p-4 flex-shrink-0"
                >
                <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">
                    {cert.description}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                    {cert?.skill?.name}
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
                    <DialogContent className="max-w-lg">
                    <img
                        src={showingImage ?? ""}
                        alt="Certification"
                        className="w-full h-auto rounded"
                    />
                    </DialogContent>
                </Dialog>
                </div>
            ))}
        </div>
    )
}
