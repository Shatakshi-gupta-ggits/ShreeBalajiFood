
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
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [showMoreDishes, setShowMoreDishes] = useState(false);

  const restaurant = {
    id: Number(id),
    name: "Shri Balaji Foods",
    rating: 4.8,
    cuisine: "Pure Vegetarian",
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
    isOpen: true,
    location: "Downtown"
  };

  const menuCategories = [
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "beverages", name: "Beverages", icon: "☕" },
    { id: "juices", name: "Juices", icon: "🧃" },
    { id: "combos", name: "Combos", icon: "🎁" }
  ];

  const menuItems = {
    pizza: [
      { id: 1, name: "Sweet Corn Pizza", description: "Delicious pizza with sweet corn topping", price: 99.00, image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop", offer: "20% OFF" },
      { id: 2, name: "Cheese Pizza", description: "Classic cheese pizza with fresh mozzarella", price: 129.00, image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=300&h=200&fit=crop", offer: null },
      { id: 3, name: "Double Cheese Pizza", description: "Extra cheesy pizza for cheese lovers", price: 149.00, image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=300&h=200&fit=crop", offer: "15% OFF" },
      { id: 4, name: "Mix Veg Pizza", description: "Fresh vegetables with cheese", price: 179.00, image: "https://images.unsplash.com/photo-1548869206-93b036288d7e?w=300&h=200&fit=crop", offer: null },
      { id: 5, name: "Tandoori Veg Pizza", description: "Tandoori flavored vegetable pizza", price: 199.00, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop", offer: "25% OFF" },
      { id: 6, name: "Paneer Paradise Pizza", description: "Rich paneer with special sauce", price: 219.00, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop", offer: null },
      { id: 7, name: "Cheese Burst Pizza", description: "Cheese bursting from every bite", price: 249.00, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop", offer: "Buy 1 Get 1 Free" },
      { id: 8, name: "Pare Pari Pizza", description: "Crispy and crunchy pizza delight", price: 169.00, image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop", offer: "30% OFF" }
    ],
    beverages: [
      { id: 9, name: "Choco Cold Coffee", description: "Chilled chocolate coffee", price: 39.00, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop", offer: null },
      { id: 15, name: "Banana Shake", description: "Fresh banana milkshake", price: 49.00, image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop", offer: "15% OFF" }
    ],
    juices: [
      { id: 10, name: "Anar Juice", description: "Fresh pomegranate juice", price: 99.00, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop", offer: null },
      { id: 11, name: "Pineapple Juice", description: "Freshly squeezed pineapple juice", price: 49.00, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop", offer: "20% OFF" },
      { id: 12, name: "Mosambi Juice", description: "Fresh sweet lime juice", price: 70.00, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop", offer: null }
    ],
    combos: [
      { id: 13, name: "Family Pack Combo", description: "Perfect combo for family", price: 451.00, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop", offer: "Save ₹100" },
      { id: 14, name: "Pro Combo - The Balaji Special Box", description: "Our signature combo box", price: 349.00, image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop", offer: "🏆 Special" }
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

  const currentItems = menuItems[activeCategory as keyof typeof menuItems] || [];
  const visibleItems = showMoreDishes ? currentItems : currentItems.slice(0, 3);

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
              <Badge className="bg-green-600">
                Pure Vegetarian
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
              <h2 className="text-xl font-bold mb-4">Menu Categories</h2>
              <div className="space-y-2">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setShowMoreDishes(false);
                    }}
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
              {visibleItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48 md:h-32">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.offer && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            {item.offer}
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <span className="text-lg font-bold text-orange-500">₹{item.price}</span>
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
              
              {currentItems.length > 3 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowMoreDishes(!showMoreDishes)}
                    className="px-8"
                  >
                    {showMoreDishes ? "View Less" : "View More"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
