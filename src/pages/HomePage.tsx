import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, Shield, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/data/products';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const featuredProducts = mockProducts.filter(p => p.status === 'approved').slice(0, 6);

  // Slideshow images from product-images folder
  const heroImages = [
    '/product-images/ff.jpeg',
    '/product-images/hh.jpeg',
    '/product-images/hy.jpeg',
    '/product-images/rr.jpeg',
    // '/product-images/woven-grass-mat.jpg',
    // '/product-images/copper-wire-art.jpg',
  ];
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Hero Background Slideshow */}
        <div className="absolute inset-0 w-full h-full z-0">
          {heroImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt="hero background"
              className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${currentHero === idx ? 'opacity-100' : 'opacity-0'}`}
              style={{ zIndex: 0, filter: 'brightness(0.45) blur(2px)' }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to{' '}
              <span className="gradient-hero bg-clip-text text-transparent">
                Town-Nomic
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Where we secure the unseen economy by connecting authentic African artisans 
              with customers worldwide. Discover unique handcrafted treasures that tell a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="btn-primary group">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="btn-secondary">
                  Join as Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float z-20"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/20 rounded-full animate-float z-20" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Town-Nomic?</h2>
            <p className="text-lg text-muted-foreground">Empowering communities through authentic craftsmanship</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-xl shadow-md hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">Every product is carefully reviewed and approved by our expert team.</p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-xl shadow-md hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground">Supporting local artisans and preserving traditional craftsmanship.</p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-xl shadow-md hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Pieces</h3>
              <p className="text-muted-foreground">Each item tells a unique story and represents genuine African heritage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked treasures from our talented artisans</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};