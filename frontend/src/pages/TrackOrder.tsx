
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, Phone, ArrowLeft } from "lucide-react";

const TrackOrder = () => {
  const navigate = useNavigate();
  const [orderStatus] = useState("preparing");

  const orderDetails = {
    orderId: "#FE2024001",
    restaurant: "Mario's Pizza Palace",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Garlic Bread", quantity: 2, price: 13.98 }
    ],
    total: 29.96,
    estimatedTime: "25-35 min",
    deliveryAddress: "123 Main Street, Apartment 4B"
  };

  const statusSteps = [
    { id: "confirmed", label: "Order Confirmed", completed: true },
    { id: "preparing", label: "Preparing", completed: true },
    { id: "pickup", label: "Ready for Pickup", completed: false },
    { id: "delivery", label: "Out for Delivery", completed: false },
    { id: "delivered", label: "Delivered", completed: false }
  ];

  const getProgressValue = () => {
    const currentIndex = statusSteps.findIndex(step => step.id === orderStatus);
    return ((currentIndex + 1) / statusSteps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order {orderDetails.orderId}</span>
                  <Badge className="bg-orange-500">Preparing</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Estimated delivery time</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{orderDetails.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <Progress value={getProgressValue()} className="h-2" />
                  
                  <div className="space-y-3">
                    {statusSteps.map((step) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          step.completed ? "bg-green-50 text-green-800" : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${
                            step.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                        <span className="font-medium">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-gray-600">{orderDetails.deliveryAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Contact Delivery Partner</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">{orderDetails.restaurant}</p>
                    <div className="space-y-2">
                      {orderDetails.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${orderDetails.total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
