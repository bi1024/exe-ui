import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Mail } from "lucide-react";

export interface IProfile {
    avatarUrl: string
    fullname: string
    email: string
    createdAt: string
    bio: string
    videoUrl:string
}

export function TutorProfile({ profile }: { profile: IProfile }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
                <Card>
                <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 ">
                    <AvatarImage
                        className="w-full h-full object-cover"
                        src={profile?.avatarUrl}
                    />
                    <AvatarFallback>{profile?.fullname}</AvatarFallback>
                    </Avatar>

                    <CardTitle className="text-xl">{profile?.fullname}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {/* {isEditing ? (
                            <Input
                            value={profile.email}
                            onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                            }
                            type="email"
                            />
                            ) : ( */}
                    <span className="text-sm text-gray-600">
                        {profile?.email}
                    </span>
                    </div>

                    <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                        Joined {profile?.createdAt}
                    </span>
                    </div>
                </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                {/* Bio Section */}
                <Card>
                <CardHeader>
                    <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">{profile?.bio}</p>
                </CardContent>
                </Card>
            </div>
        </div>
    )
}