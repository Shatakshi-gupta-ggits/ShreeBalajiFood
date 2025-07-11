import { useState, useEffect } from "react";
import { Search, MapPin, Clock, Star, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const { addToCart, getCartCount } = useCart();
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "Delicious Vegetarian Food Delivered Fast",
      subtitle: "Pure vegetarian dishes from Shri Balaji Foods",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop",
      offer: "50% OFF on first order"
    },
    {
      title: "Fresh Ingredients, Amazing Taste",
      subtitle: "Quality vegetarian food made with love",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop",
      offer: "Free delivery above ₹300"
    },
    {
      title: "Your Favorite Vegetarian Cuisines",
      subtitle: "Pizza, Juices, Shakes & more",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop",
      offer: "Special combo deals"
    }
  ];

  const featuredRestaurants = [
    {
      id: 1,
      name: "Shri Balaji Foods",
      rating: 4.8,
      cuisine: "Pure Vegetarian",
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      isOpen: true
    }
  ];

  const popularDishes = [
    {
      id: 1,
      name: "Cheese Burst Pizza",
      price: 249.00,
      restaurant: "Shri Balaji Foods",
      image: "https://images.unsplash.com/photo-1604382354936-07c5b5d013d8?w=300&h=200&fit=crop",
      rating: 4.8
    },
    {
      id: 2,
      name: "Paneer Paradise Pizza",
      price: 219.00,
      restaurant: "Shri Balaji Foods",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      rating: 4.9
    },
    {
      id: 3,
      name: "Family Pack Combo",
      price: 451.00,
      restaurant: "Shri Balaji Foods",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
      rating: 4.7
    },
    {
      id: 4,
      name: "Choco Cold Coffee",
      price: 39.00,
      restaurant: "Shri Balaji Foods",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop",
      rating: 4.6
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (dish: any) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      restaurant: dish.restaurant
    });
    console.log(`Added ${dish.name} to cart`);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const cartCount = getCartCount();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍕</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Shri Balaji Foods</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</Link>
              <Link to="/restaurants" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Menu</Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Categories</button>
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/restaurants?category=pizza" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Pizza</Link>
                  <Link to="/restaurants?category=beverages" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Beverages</Link>
                  <Link to="/restaurants?category=juices" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Juices</Link>
                  <Link to="/restaurants?category=combos" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">Combos</Link>
                </div>
              </div>
              <Link to="/restaurants?deals=true" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Deals & Offers</Link>
              <Link to="/track-order" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Track Order</Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="hidden md:flex">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-orange-500 hover:bg-orange-600 hidden md:flex">Sign Up</Button>
              </Link>
              
              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-orange-500 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</Link>
                <Link to="/restaurants" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Menu</Link>
                <Link to="/restaurants?category=all" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Categories</Link>
                <Link to="/restaurants?deals=true" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Deals & Offers</Link>
                <Link to="/track-order" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Track Order</Link>
                <div className="flex space-x-2 pt-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <Badge className="mb-4 bg-orange-500 hover:bg-orange-600">
              {heroSlides[currentSlide].offer}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for dishes..."
                  className="pl-10 h-12 text-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Enter location"
                  className="pl-10 h-12 w-full md:w-48 text-gray-800"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button onClick={handleSearch} className="h-12 px-8 bg-orange-500 hover:bg-orange-600">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Featured Restaurant */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Restaurant</h2>
                <p className="text-xl text-gray-600">Pure vegetarian food made with love</p>
              </div>
              <Link to="/restaurants">
                <Button variant="outline" className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
                  View Menu
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
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
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  
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
                      Delivery: ₹{restaurant.deliveryFee}
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
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Dishes</h2>
                <p className="text-xl text-gray-600">Most ordered items this week</p>
              </div>
              <Link to="/restaurants">
                <Button variant="outline" className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{dish.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{dish.restaurant}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-orange-500">₹{dish.price}</span>
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(dish)}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get your favorite vegetarian food</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Menu</h3>
              <p className="text-gray-600">Explore our delicious vegetarian dishes and combos</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Select Food</h3>
              <p className="text-gray-600">Add your favorite dishes to cart and customize them</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Track & Enjoy</h3>
              <p className="text-gray-600">Pay securely and track your order in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🍕</span>
                </div>
                <span className="text-2xl font-bold">Shri Balaji Foods</span>
              </div>
              <p className="text-gray-400">
                Pure vegetarian food delivered fresh and fast to your doorstep.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Pizza</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Beverages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Juices</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Combos</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Shri Balaji Foods. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
