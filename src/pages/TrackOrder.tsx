
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, MapPin, Phone, User, ArrowLeft } from "lucide-react";

const TrackOrder = () => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(1);

  const orderStatuses = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been confirmed",
      time: "2:30 PM",
      completed: true
    },
    {
      id: 2,
      title: "Restaurant Preparing",
      description: "Your meal is being prepared",
      time: "2:45 PM",
      completed: currentStatus >= 2
    },
    {
      id: 3,
      title: "Out for Delivery",
      description: "Your order is on the way",
      time: "3:15 PM",
      completed: currentStatus >= 3
    },
    {
      id: 4,
      title: "Delivered",
      description: "Enjoy your meal!",
      time: "3:30 PM",
      completed: currentStatus >= 4
    }
  ];

  const orderDetails = {
    id: "FE123456789",
    restaurant: "Mario's Pizza Palace",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Garlic Bread", quantity: 1, price: 6.99 }
    ],
    total: 22.97,
    address: "123 Main St, City, 12345",
    phone: "+1 (555) 123-4567",
    deliveryAgent: "John Doe",
    estimatedTime: "3:30 PM"
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Status */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <Badge className="w-fit bg-orange-500">
                  {orderStatuses[currentStatus - 1].title}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderStatuses.map((status, index) => (
                    <div key={status.id} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        status.completed 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-300 text-gray-600"
                      }`}>
                        {status.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-medium ${
                              status.completed ? "text-gray-800" : "text-gray-500"
                            }`}>
                              {status.title}
                            </h3>
                            <p className="text-sm text-gray-600">{status.description}</p>
                          </div>
                          {status.completed && (
                            <span className="text-sm text-gray-500">{status.time}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Agent */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Delivery Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{orderDetails.deliveryAgent}</p>
                    <p className="text-sm text-gray-600">Your delivery partner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{orderDetails.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Restaurant</p>
                  <p className="font-medium">{orderDetails.restaurant}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <div className="space-y-2">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${orderDetails.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-gray-600">{orderDetails.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-gray-600">{orderDetails.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-orange-600">{orderDetails.estimatedTime}</p>
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
