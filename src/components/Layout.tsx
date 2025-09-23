import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, Menu, X, ShoppingCart, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

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
              {/* <Link 
                to="/vendor" 
                className={`nav-link text-white hover:text-white/80 ${isActive('/vendor') ? 'text-white font-semibold' : ''}`}
              >
                Vendor
              </Link> */}
              {/* <Link 
                to="/admin" 
                className={`nav-link text-white hover:text-white/80 ${isActive('/admin') ? 'text-white font-semibold' : ''}`}
              >
                Admin
              </Link> */}
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
                  <Button onClick={logout} variant="ghost" className="text-white hover:bg-white/10">
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
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition-all">
                  {/* Facebook SVG */}
                  <svg width="20" height="20" fill="currentColor" className="text-blue-600" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition-all">
                  {/* Twitter SVG */}
                  <svg width="20" height="20" fill="currentColor" className="text-sky-500" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.016-.634A9.936 9.936 0 0 0 24 4.557z"/></svg>
                </a>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition-all">
                  {/* WhatsApp SVG */}
                  <svg width="20" height="20" fill="currentColor" className="text-green-500" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.987c-.003 5.451-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05.001C5.495.001.06 5.435.058 11.989c0 2.113.553 4.174 1.601 5.981L.057 24l6.164-1.643a11.93 11.93 0 0 0 5.888 1.504h.005c6.554 0 11.989-5.434 11.991-11.988a11.86 11.86 0 0 0-3.489-8.484"/></svg>
                </a>
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
                Empowering Tshwane township communities and connecting people to local businesses, services, and opportunities.
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