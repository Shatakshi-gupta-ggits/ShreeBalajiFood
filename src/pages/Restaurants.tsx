
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Clock, MapPin, Search, Filter, ArrowLeft, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Restaurants = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showMore, setShowMore] = useState(false);
  const { addToCart } = useCart();
  
  const allFoodItems = [
    // Pizza Items
    { id: 1, name: "Sweet Corn Pizza", price: 99.00, category: "pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop", description: "Delicious pizza with sweet corn topping", rating: 4.5, offer: "20% OFF" },
    { id: 2, name: "Cheese Pizza", price: 129.00, category: "pizza", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=300&h=200&fit=crop", description: "Classic cheese pizza with fresh mozzarella", rating: 4.6, offer: null },
    { id: 3, name: "Double Cheese Pizza", price: 149.00, category: "pizza", image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=300&h=200&fit=crop", description: "Extra cheesy pizza for cheese lovers", rating: 4.7, offer: "15% OFF" },
    { id: 4, name: "Mix Veg Pizza", price: 179.00, category: "pizza", image: "https://images.unsplash.com/photo-1548869206-93b036288d7e?w=300&h=200&fit=crop", description: "Fresh vegetables with cheese", rating: 4.4, offer: null },
    { id: 5, name: "Tandoori Veg Pizza", price: 199.00, category: "pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop", description: "Tandoori flavored vegetable pizza", rating: 4.8, offer: "25% OFF" },
    { id: 6, name: "Paneer Paradise Pizza", price: 219.00, category: "pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop", description: "Rich paneer with special sauce", rating: 4.9, offer: null },
    { id: 7, name: "Cheese Burst Pizza", price: 249.00, category: "pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop", description: "Cheese bursting from every bite", rating: 4.8, offer: "Buy 1 Get 1 Free" },
    { id: 8, name: "Pare Pari Pizza", price: 169.00, category: "pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop", description: "Crispy and crunchy pizza delight", rating: 4.5, offer: "30% OFF" },
    
    // Beverages
    { id: 9, name: "Choco Cold Coffee", price: 39.00, category: "beverages", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop", description: "Chilled chocolate coffee", rating: 4.3, offer: null },
    { id: 10, name: "Banana Shake", price: 49.00, category: "beverages", image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop", description: "Fresh banana milkshake", rating: 4.4, offer: "15% OFF" },
    
    // Juices
    { id: 11, name: "Anar Juice", price: 99.00, category: "juices", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop", description: "Fresh pomegranate juice", rating: 4.6, offer: null },
    { id: 12, name: "Pineapple Juice", price: 49.00, category: "juices", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop", description: "Freshly squeezed pineapple juice", rating: 4.5, offer: "20% OFF" },
    { id: 13, name: "Mosambi Juice", price: 70.00, category: "juices", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop", description: "Fresh sweet lime juice", rating: 4.4, offer: null },
    
    // Combos
    { id: 14, name: "Family Pack Combo", price: 451.00, category: "combos", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop", description: "Perfect combo for family", rating: 4.7, offer: "Save ₹100" },
    { id: 15, name: "Pro Combo - The Balaji Special Box", price: 349.00, category: "combos", image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop", description: "Our signature combo box", rating: 4.9, offer: "🏆 Special" }
  ];

  const filteredItems = allFoodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleItems = showMore ? filteredItems : filteredItems.slice(0, 12);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurant: "Shri Balaji Foods"
    });
    console.log(`Added ${item.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Our Menu - Shri Balaji Foods</h1>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for dishes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.offer && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    {item.offer}
                  </Badge>
                )}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-600">
                    Pure Veg
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="text-lg font-bold text-orange-500">₹{item.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-xs text-gray-500 mb-3 capitalize">Category: {item.category}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">15-25 min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Shri Balaji Foods</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {filteredItems.length > 12 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowMore(!showMore)}
              className="px-8"
            >
              {showMore ? "View Less" : "View More"}
            </Button>
          </div>
        )}

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
