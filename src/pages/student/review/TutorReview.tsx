import apiClient from "@/api/apiClient";
import { ITutor } from "@/components/home";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserHeader from "@/components/UserHeader";
import { Modal } from "@/components/modal/Modal";
import { MessageCircle, Send, SendHorizonal, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export type IRating = 0 | 1 | 2 | 3 | 4 | 5;

interface IReview {
    _id: string
    rating: IRating
    comment: string
}

interface ITutorWithReview extends ITutor {
    review: IReview
}

export function TutorReview() {
    const [tutors, setTutors] = useState<ITutorWithReview[]>([]);
    const [tutorSelectedId, setTutorSelectedId] = useState<string | null>();
    const [rating, setRating] = useState<IRating>(0);
    const [comment, setComment] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        async function fetchTutorsLearnedBefore() {
            try {
                const response = await apiClient.get('/review/tutors/commentable');
                setTutors(response.data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchTutorsLearnedBefore();
    }, []);

    function handleOnClickReview({ tutorId, review }: { tutorId: string, review: IReview | null }) {
        setTutorSelectedId(tutorId);
        if(review) {
            setRating(review.rating);
            setComment(review.comment);
        } else {
            setRating(0);
            setComment(null);
        }

    }

    function handleOnClickRating(value: IRating) {
        if(value === rating) {
            setRating(0);
        } else {
            setRating(value);
        }
    }

    const renderRatingSection = useCallback(() => {
        const arr = [1,2,3,4,5];
        return (
            <div className="flex flex-row gap-2">
                {arr.map(e => (
                    <Button variant="ghost" onClick={() => handleOnClickRating(e as IRating)}>
                        <Star fill={e <= rating ? "yellow" : "white"} />
                    </Button>
                ))}
            </div>
        )
    }, [rating]);

    const renderCommentSection = () => {
        return (
            <Textarea 
                rows={8} 
                placeholder="Type your comment here.."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
            />
        )
    }

    async function handleOnClickSend(review: IReview) {
        if(rating === 0) {
            alert('Please rate your tutor before sending a review');
            return;
        }
        
        try {
            if(!review) {
                await apiClient.post('/review', { tutorId: tutorSelectedId, rating, comment });
            } else {
                await apiClient.put(`/review/${review._id}`, { rating, comment } );
            }
            
            const tutorsUpdated = tutors.map(tutor => {
                if(tutor._id === tutorSelectedId) return { ...tutor, review: { ...review, rating, comment } };
                return tutor;
            }) 
            setTutors(tutorsUpdated);
            handleOnClose();
        } catch(err) {
            console.log(err);
        }
    }

    function handleOnClose() {
        setIsOpen(false);
    }

    return (
        <div>
            <UserHeader />
            <main className="container px-4 md:px-6 py-8">
                
                <Tabs defaultValue="featured" className="w-full">
                    <TabsContent value="featured" className="space-y-8">
                        {/* Featured Teachers Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tutors.map((tutor) => (
                            <Card
                                key={tutor._id}
                                className="overflow-hidden hover:shadow-lg transition-shadow"
                            >
                            <CardHeader className="p-0">
                                <div className="relative h-48 bg-muted">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Avatar className="h-32 w-32 border-4 border-background">
                                    <AvatarImage
                                        src={tutor?.avatarUrl}
                                        alt={tutor.username}
                                    />
                                    <AvatarFallback>
                                        {tutor.fullname.charAt(0)}
                                    </AvatarFallback>
                                    </Avatar>
                                </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 text-center">
                                <CardTitle>{tutor.fullname}</CardTitle>
                                <CardDescription>
                                    
                                </CardDescription>
                            </CardContent>
                                
                            <CardFooter className="flex flex-col justify-between">
                                <Modal
                                    trigger={
                                        <Button className="flex flex-row gap-2" onClick={() => handleOnClickReview({ tutorId: tutor._id, review: tutor.review })}>
                                            <MessageCircle />
                                            Review
                                        </Button>
                                    }   
                                    title="Review"
                                    body={
                                        <div className="flex flex-col gap-4">
                                            {renderRatingSection()}
                                            {renderCommentSection()}
                                            <Button className="flex flex-row gap-2" onClick={() => handleOnClickSend(tutor.review)}>
                                                Send
                                                <SendHorizonal size={20} /> 
                                            </Button>
                                        </div>
                                    }
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    handleOnClose={handleOnClose}
                                    // handleOnClose={handleOnCloseReviewModal}
                                />
                            </CardFooter>
                            </Card>
                        ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}