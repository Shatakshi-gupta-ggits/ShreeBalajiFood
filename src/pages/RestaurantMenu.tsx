
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("starters");

  const restaurant = {
    id: Number(id),
    name: "Mario's Pizza Palace",
    rating: 4.8,
    cuisine: "Italian",
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
    isOpen: true,
    location: "Downtown"
  };

  const menuCategories = [
    { id: "starters", name: "Starters", icon: "🥗" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "pasta", name: "Pasta", icon: "🍝" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
    { id: "beverages", name: "Beverages", icon: "🥤" }
  ];

  const menuItems = {
    starters: [
      { id: 1, name: "Garlic Bread", description: "Crispy bread with garlic butter", price: 6.99, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300&h=200&fit=crop" },
      { id: 2, name: "Caesar Salad", description: "Fresh romaine with parmesan", price: 8.99, image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=300&h=200&fit=crop" }
    ],
    pizza: [
      { id: 3, name: "Margherita Pizza", description: "Fresh tomato, mozzarella, basil", price: 12.99, image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop" },
      { id: 4, name: "Pepperoni Pizza", description: "Spicy pepperoni with cheese", price: 15.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop" }
    ],
    pasta: [
      { id: 5, name: "Spaghetti Carbonara", description: "Creamy pasta with bacon", price: 14.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop" },
      { id: 6, name: "Penne Arrabbiata", description: "Spicy tomato pasta", price: 13.99, image: "https://images.unsplash.com/photo-1563379091339-03246963d25c?w=300&h=200&fit=crop" }
    ],
    desserts: [
      { id: 7, name: "Tiramisu", description: "Classic Italian dessert", price: 7.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop" }
    ],
    beverages: [
      { id: 8, name: "Coke", description: "Chilled soft drink", price: 2.99, image: "https://images.unsplash.com/photo-1581636625402-29d2c0502b5a?w=300&h=200&fit=crop" }
    ]
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurant: restaurant.name
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.location}</span>
              </div>
              <Badge className="bg-green-500">
                {restaurant.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <div className="space-y-2">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? "bg-orange-500 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {menuItems[activeCategory as keyof typeof menuItems]?.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full md:w-48 h-48 md:h-32 object-cover"
                      />
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <span className="text-lg font-bold text-orange-500">${item.price}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
