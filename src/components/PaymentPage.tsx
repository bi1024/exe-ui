import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CreditCard, Calendar, Lock, CheckCircle } from "lucide-react";

export default function PaymentPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // Mock lesson data
  const lesson = {
    id: lessonId || "lesson-123",
    title: "Advanced JavaScript Concepts",
    price: 45,
    duration: 60,
    date: "June 15, 2023",
    time: "10:00 AM",
    teacher: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/payment-confirmation/${lesson.id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Select your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>

                <TabsContent value="credit-card" className="space-y-4 mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            placeholder="John Smith"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              required
                              className="pl-10"
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <div className="relative">
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                required
                                className="pl-10"
                              />
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <div className="relative">
                              <Input
                                id="cvc"
                                placeholder="123"
                                required
                                className="pl-10"
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Billing Address</Label>
                        <Input
                          id="billing-address"
                          placeholder="123 Main St"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP / Postal Code</Label>
                          <Input id="zip" placeholder="10001" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="United States"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full mt-6">
                      Pay ${lesson.price}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="paypal" className="mt-4">
                  <div className="text-center py-8">
                    <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                        alt="PayPal"
                        className="h-12 w-auto"
                      />
                    </div>
                    <p className="text-gray-600 mb-6">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                    <Button
                      onClick={() =>
                        navigate(`/payment-confirmation/${lesson.id}`)
                      }
                      className="w-full"
                    >
                      Continue to PayPal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  <div className="flex items-center mt-1">
                    <img
                      src={lesson.teacher.avatar}
                      alt={lesson.teacher.name}
                      className="h-5 w-5 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      {lesson.teacher.name}
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span>Date:</span>
                    <span>{lesson.date}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Time:</span>
                    <span>{lesson.time}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Duration:</span>
                    <span>{lesson.duration} minutes</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex justify-between py-1">
                    <span>Lesson Price</span>
                    <span>${lesson.price}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Platform Fee</span>
                    <span>$2.00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(lesson.price + 2).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Lock className="h-4 w-4 mr-1" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>24-hour cancellation policy</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
