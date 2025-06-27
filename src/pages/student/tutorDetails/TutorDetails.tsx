import { useEffect, useState } from "react";
import { TutorCertificates } from "./components/TutorCertificates";
import { IProfile, TutorProfile } from "./components/TutorProfile";
import { useParams } from "react-router-dom";
import apiClient from "@/api/apiClient";
import { IReview, TutorReviews } from "./components/TutorReviews";



export function TutorDetails() {
    const { tutorId } = useParams();
    const [profile, setProfile] = useState<IProfile>(null);
    const [certifications, setCertifications] = useState([]);
    const [showingImage, setShowingImage] = useState<string | null>(null);
    const [reviews, setReviews] = useState<IReview[]>([]);

    useEffect(() => {
        async function fetchTutor() {
            try {
                const response = await apiClient.get(`/profile/${tutorId}`);

                console.log("profile", response.data);
                setProfile(response.data);
                // setSlots(slotsFormatted);
            } catch (err) {
                console.log(err);
            }
        }
        fetchTutor();

        const getCerts = async () => {
            const result = await apiClient.get(`/tutor/certs/${tutorId}`);
            // console.log(result.data.data);
            console.log(result.data.data);
            setCertifications(result.data.data);
            };
        getCerts();

        async function getReviews() {
            try {
                const response = await apiClient.get(`/review/tutors/reviews/${tutorId}`);
                setReviews(response.data.data);
            } catch(err) {
                console.log(err);
            }
        }
        getReviews();
  }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                </div>
                <TutorProfile profile={profile} />

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
                </div>
                <TutorCertificates 
                    certifications={certifications}
                    showingImage={showingImage}
                    setShowingImage={setShowingImage}
                />

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
                </div>

                <TutorReviews
                    reviews={reviews}
                />
            </div>
        </div>
    )
}