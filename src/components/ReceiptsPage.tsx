import apiClient from "@/api/apiClient";
import UserHeader from "@/components/UserHeader";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ReceiptsPage() {
  const [payments, setPayments] = useState<any>([]);
  useEffect(() => {
    const fetchPayments = async () => {
      const result = await apiClient.get("/profile/myProfile/payments");
      console.log(result.data);
      setPayments(result.data);
    };
    fetchPayments();
  }, []);

  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payments.map((payment) => (
              <Card key={payment._id} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Payment #{payment._id.slice(-6).toUpperCase()}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span className="font-medium text-green-600">
                      ₫{payment.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span
                      className={`font-medium ${
                        payment.status === "success"
                          ? "text-green-500"
                          : payment.status === "failed"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {payment.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schedule ID</span>
                    <span className="text-muted-foreground">
                      {payment.scheduleId.slice(-6)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
