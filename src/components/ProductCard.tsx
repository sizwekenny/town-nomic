import React from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  showStatus?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onViewDetails, 
  showStatus = false 
}) => {
  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
    : 0;

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      rejected: 'bg-destructive text-destructive-foreground'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="product-card animate-fade-in group">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {showStatus && (
          <Badge className={`absolute top-2 right-2 ${getStatusBadge(product.status)}`}>
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </Badge>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="bg-white/90 hover:bg-white"
            onClick={() => onViewDetails?.(product)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">{product.name}</h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">R{product.price}</span>
          
          {product.reviews.length > 0 && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({product.reviews.length})
              </span>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          by {product.vendor.name}
        </div>

        <Button className="w-full btn-primary" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};