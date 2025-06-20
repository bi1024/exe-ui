import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { IRating } from "../../review/TutorReview"

export interface IUser {
    username: string
    fullname: string
    email: string
    avatarUrl: string
}

export interface IReview {
    _id: string
    student: IUser
    updatedAt: Date
    rating: IRating
    comment: string
} 

export function TutorReviews({ reviews } : { reviews: IReview[] }) {

    const renderRatingSection = (rating: IRating) => {
        const arr = [1,2,3,4,5];
        return (
            <div className="flex flex-row gap-2">
                {arr.map(e => (
                    <Star fill={e <= rating ? "yellow" : "white"} />
                ))}
            </div>
        )
    };

    return (
        <div className="flex flex-col gap-4">
            {reviews.map(review => {
                return (
                    <div
                        key={review._id}
                        className="min-w-[200px] bg-white rounded-xl shadow p-4 flex-shrink-0"
                    >
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row gap-4">
                                <Avatar className="w-24 h-24 mb-4 text-center">
                                    <AvatarImage
                                        className="w-full h-full object-cover"
                                        src={review.student.avatarUrl}
                                    />
                                    <AvatarFallback>{review.student.fullname}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-2 mt-4">
                                    <div>{review.student.username}</div>
                                    {renderRatingSection(review.rating)}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            {review.comment ? <div className="mx-4">{review.comment}</div> : <div className="mx-4 font-light">No comments yet</div>}
                        </CardContent>
                    </Card>

                    </div>
                )
            })}
        </div>
    )
}