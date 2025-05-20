import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  Download,
  MessageCircle,
  CircleX,
} from "lucide-react";

export default function PaymentConfirmationPage() {
  // const { lessonId } = useParams();

  // VNPay response states
  const [txnRef, setTxnRef] = useState("");

  const [transactionNo, setTransactionNo] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    setTxnRef(query.get("vnp_TxnRef") || "");
    setTransactionNo(query.get("vnp_TransactionNo") || "");
    setBankCode(query.get("vnp_BankCode") || "");
    setAmount(query.get("vnp_Amount") || "");
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center h-16 w-16 rounded-full mb-4 ${"bg-green-100"}`}
          >
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Payment Confirmation</h1>
          <p className="text-gray-600 mt-2">{message}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Confirmation</CardTitle>
            <p className="text-sm text-gray-500">Transaction #{txnRef}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
            
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Payment Details</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Amount Paid</span>
                  <span>
                    {(parseInt(amount || "0") / 100).toLocaleString()} VND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bank</span>
                  <span>{bankCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>VNPay Transaction No</span>
                  <span>{transactionNo}</span>
                </div>
              </div>
            </div>

           
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4">
          
          </CardFooter>
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
