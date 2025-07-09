
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react";

const OrderConfirmation = () => {
  const orderId = "FE" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 35 * 60 * 1000).toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="mb-8">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-4">
                Thank you for your order. Your delicious meal is being prepared.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="text-lg font-bold text-orange-600">{orderId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-orange-600">{estimatedDelivery}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-gray-600">123 Main St, City, 12345</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-600">Your order has been confirmed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Restaurant Preparing</p>
                    <p className="text-sm text-gray-600">Your meal is being prepared</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Out for Delivery</p>
                    <p className="text-sm text-gray-600">Your order is on the way</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Delivered</p>
                    <p className="text-sm text-gray-600">Enjoy your meal!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/track-order" className="flex-1">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Track Your Order
              </Button>
            </Link>
            <Link to="/restaurants" className="flex-1">
              <Button variant="outline" className="w-full">
                Order Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
