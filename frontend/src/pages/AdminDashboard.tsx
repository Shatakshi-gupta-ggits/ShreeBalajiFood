
import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Clock,
  CheckCircle,
  XCircle,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { adminUser, logout } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Mock data for demonstration
  const dashboardStats = {
    totalOrders: 1245,
    totalRevenue: 45680,
    activeUsers: 892,
    totalProducts: 156
  };

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', total: 25.99, status: 'delivered', time: '2 hours ago' },
    { id: '#ORD002', customer: 'Jane Smith', total: 18.50, status: 'preparing', time: '30 minutes ago' },
    { id: '#ORD003', customer: 'Mike Johnson', total: 32.75, status: 'pending', time: '15 minutes ago' },
    { id: '#ORD004', customer: 'Sarah Wilson', total: 22.00, status: 'cancelled', time: '1 hour ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'preparing': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {adminUser?.name}</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-orange-100 text-orange-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold">{dashboardStats.totalOrders}</p>
                      </div>
                      <ShoppingBag className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold">${dashboardStats.totalRevenue}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold">{dashboardStats.activeUsers}</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Products</p>
                        <p className="text-2xl font-bold">{dashboardStats.totalProducts}</p>
                      </div>
                      <Package className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="font-semibold">${order.total}</p>
                          <p className="text-sm text-gray-500">{order.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'orders' && (
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Order management features will be implemented here.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'products' && (
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Product management features will be implemented here.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management features will be implemented here.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
