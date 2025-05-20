import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";
import { CircleX } from "lucide-react";

export default function PaymentFailedPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center h-16 w-16 rounded-full mb-4 ${"bg-red-100"}`}
          >
            <CircleX className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-gray-600 mt-2">{message}</p>
        </div>

        <Card>
          <CardContent className="space-y-6">
            <div></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

            <Separator />
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4"></CardFooter>
        </Card>

        <div className="text-center mt-8">
          <Button variant="link" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
