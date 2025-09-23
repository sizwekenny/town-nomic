import React, { useState } from 'react';
import { Check, X, Eye, Bell, Package, Users, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { mockProducts } from '@/data/products';

export const AdminDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [notifications] = useState([
    { id: 1, message: 'New product uploaded by Heritage Beadwork', time: '2 min ago' },
    { id: 2, message: 'Product approved: Traditional Zulu Basket', time: '1 hour ago' },
    { id: 3, message: 'New vendor registration: Earth Weavers', time: '3 hours ago' }
  ]);

  const pendingProducts = products.filter(p => p.status === 'pending');
  const approvedProducts = products.filter(p => p.status === 'approved');
  const rejectedProducts = products.filter(p => p.status === 'rejected');

  const handleApprove = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, status: 'approved' as const } : p
    ));
    toast.success('Product approved successfully!');
  };

  const handleReject = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, status: 'rejected' as const } : p
    ));
    toast.error('Product rejected.');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      rejected: 'bg-destructive text-destructive-foreground'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage products, vendors, and marketplace activity</p>
          </div>
          <div className="relative">
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-primary mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-3xl font-bold text-primary">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-warning mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold text-warning">{pendingProducts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-success mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                  <p className="text-3xl font-bold text-success">6</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-primary mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                  <p className="text-3xl font-bold text-primary">+24%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Products */}
          <div className="lg:col-span-2">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-warning" />
                  Pending Products ({pendingProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="border border-border rounded-lg p-4 animate-fade-in">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-muted-foreground text-sm mb-1">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-primary">R{product.price}</span>
                              <span className="text-muted-foreground text-sm ml-2">by {product.vendor.name}</span>
                            </div>
                            <Badge>{product.category}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toast.info('Product details opened')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-success text-success-foreground hover:bg-success/90"
                            onClick={() => handleApprove(product.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(product.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingProducts.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      No pending products to review.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Products Table */}
        <Card className="card-glow mt-8">
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.vendor.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-primary">R{product.price}</span>
                    <Badge className={getStatusBadge(product.status)}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};