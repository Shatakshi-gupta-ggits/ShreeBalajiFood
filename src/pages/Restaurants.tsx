
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Clock, Filter } from "lucide-react";

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "Mario's Pizza Palace",
      rating: 4.8,
      cuisine: "Italian",
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      isOpen: true,
      location: "Downtown"
    },
    {
      id: 2,
      name: "Dragon Express",
      rating: 4.6,
      cuisine: "Chinese",
      deliveryTime: "30-40 min",
      deliveryFee: 1.99,
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop",
      isOpen: true,
      location: "Chinatown"
    },
    {
      id: 3,
      name: "Spice Garden",
      rating: 4.9,
      cuisine: "Indian",
      deliveryTime: "20-30 min",
      deliveryFee: 3.49,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      isOpen: false,
      location: "Little India"
    },
    {
      id: 4,
      name: "Burger House",
      rating: 4.7,
      cuisine: "Fast Food",
      deliveryTime: "15-25 min",
      deliveryFee: 2.49,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      isOpen: true,
      location: "Main Street"
    },
    {
      id: 5,
      name: "Sushi Zen",
      rating: 4.5,
      cuisine: "Japanese",
      deliveryTime: "40-50 min",
      deliveryFee: 4.99,
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isOpen: true,
      location: "Uptown"
    },
    {
      id: 6,
      name: "Taco Fiesta",
      rating: 4.4,
      cuisine: "Mexican",
      deliveryTime: "20-30 min",
      deliveryFee: 2.99,
      image: "https://images.unsplash.com/photo-1565299585323-38174c6a8d93?w=400&h=300&fit=crop",
      isOpen: true,
      location: "South Side"
    },
    {
      id: 7,
      name: "Pasta Corner",
      rating: 4.3,
      cuisine: "Italian",
      deliveryTime: "35-45 min",
      deliveryFee: 3.99,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      isOpen: true,
      location: "West End"
    },
    {
      id: 8,
      name: "BBQ Master",
      rating: 4.6,
      cuisine: "BBQ",
      deliveryTime: "30-40 min",
      deliveryFee: 3.49,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      isOpen: true,
      location: "East Side"
    },
    {
      id: 9,
      name: "Healthy Bites",
      rating: 4.2,
      cuisine: "Healthy",
      deliveryTime: "25-35 min",
      deliveryFee: 2.49,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      isOpen: true,
      location: "North Park"
    },
    {
      id: 10,
      name: "Café Delight",
      rating: 4.4,
      cuisine: "Café",
      deliveryTime: "15-25 min",
      deliveryFee: 1.99,
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop",
      isOpen: true,
      location: "City Center"
    },
    {
      id: 11,
      name: "Thai Spice",
      rating: 4.7,
      cuisine: "Thai",
      deliveryTime: "30-40 min",
      deliveryFee: 3.99,
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop",
      isOpen: true,
      location: "Thailand District"
    },
    {
      id: 12,
      name: "Mediterranean Grill",
      rating: 4.5,
      cuisine: "Mediterranean",
      deliveryTime: "35-45 min",
      deliveryFee: 4.49,
      image: "https://images.unsplash.com/photo-1544510263-4bd664d474c6?w=400&h=300&fit=crop",
      isOpen: true,
      location: "Harbor View"
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRestaurants = showMore ? filteredRestaurants : filteredRestaurants.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Restaurants</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search restaurants or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Enter location"
                className="pl-10 w-full md:w-64"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={restaurant.isOpen ? "default" : "secondary"} className={restaurant.isOpen ? "bg-green-500" : ""}>
                    {restaurant.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine} • {restaurant.location}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{restaurant.deliveryTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Delivery: ${restaurant.deliveryFee}
                  </span>
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      View Menu
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {filteredRestaurants.length > 6 && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="outline"
              className="px-8"
            >
              {showMore ? "Show Less" : `View More (${filteredRestaurants.length - 6} more)`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
