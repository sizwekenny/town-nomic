import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, Menu, X, ShoppingCart, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Mock user state - in real app would come from auth context
  const [user, setUser] = useState<any>(null);

  const handleLogin = () => {
    // Mock login - would integrate with real auth
    setUser({ name: 'John Doe', role: 'customer' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 overflow-hidden">
                <img
                  src="/product-images/logo.jpeg"
                  alt="Town-Nomic Logo"
                  className="object-cover w-full h-full"
                  style={{ filter: 'brightness(0.95) contrast(1.1)' }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">Town-Nomic</h1>
                <p className="text-xs text-white/80">Securing the Unseen Economy</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`nav-link text-white hover:text-white/80 ${isActive('/') ? 'text-white font-semibold' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`nav-link text-white hover:text-white/80 ${isActive('/products') ? 'text-white font-semibold' : ''}`}
              >
                Products
              </Link>
              <Link 
                to="/vendor" 
                className={`nav-link text-white hover:text-white/80 ${isActive('/vendor') ? 'text-white font-semibold' : ''}`}
              >
                Vendor
              </Link>
              <Link 
                to="/admin" 
                className={`nav-link text-white hover:text-white/80 ${isActive('/admin') ? 'text-white font-semibold' : ''}`}
              >
                Admin
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`nav-link text-white hover:text-white/80 ${isActive('/admin') ? 'text-white font-semibold' : ''}`}
                >
                  Admin Panel
                </Link>
              )}
              {user?.role === 'vendor' && (
                <Link 
                  to="/vendor" 
                  className={`nav-link text-white hover:text-white/80 ${isActive('/vendor') ? 'text-white font-semibold' : ''}`}
                >
                  My Products
                </Link>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Bell className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-white/10">
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

              {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="text-white hover:text-white/80 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="text-white hover:text-white/80 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/vendor" 
                  className="text-white hover:text-white/80 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vendor
                </Link>
                <Link 
                  to="/admin" 
                  className="text-white hover:text-white/80 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-white hover:text-white/80 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                {user?.role === 'vendor' && (
                  <Link 
                    to="/vendor" 
                    className="text-white hover:text-white/80 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Products
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Bar (only on products page) */}
      {location.pathname === '/' || location.pathname === '/products' ? (
        <div className="bg-white border-b border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="gradient-hero text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow us:</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition-all">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition-all">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition-all">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact our offices:</h3>
              <p className="text-white/90">Admin@town-nomic.co.za</p>
              <p className="text-white/90">012 254 2215</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">About US</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Empowering local artisans and connecting communities through authentic handcrafted products.
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/80">&copy; 2024 Town-Nomic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};