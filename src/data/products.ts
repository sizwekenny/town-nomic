export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  vendor: {
    id: string;
    name: string;
    rating: number;
    email: string;
    phone: string;
    location: string;
  };
  status: 'approved' | 'pending' | 'rejected';
  reviews: Review[];
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Traditional Zulu Basket - Green Pattern',
    price: 250,
  image: '/product-images/busket.jpeg',
    description: 'Handwoven traditional Zulu basket with intricate green and black patterns. Made from sustainable materials by skilled artisans.',
    category: 'Baskets',
    vendor: {
      id: 'v1',
      name: 'Nomsa Craft Collective',
      rating: 4.8,
      email: 'nomsa@crafts.co.za',
      phone: '+27 82 123 4567',
      location: 'Tshwane, Gauteng'
    },
    status: 'approved',
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Sarah M.',
        rating: 5,
        comment: 'Beautiful craftsmanship! The colors are vibrant and the quality is excellent.',
        createdAt: '2024-01-15'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'David K.',
        rating: 4,
        comment: 'Great addition to our home decor. Fast shipping and well packaged.',
        createdAt: '2024-01-10'
      }
    ],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Beaded Ndebele Jewelry Set',
    price: 150,
  image: '/product-images/bit.jpeg',
    description: 'Colorful traditional Ndebele beaded jewelry featuring geometric patterns in bright colors.',
    category: 'Jewelry',
    vendor: {
      id: 'v2',
      name: 'Heritage Beadwork',
      rating: 4.9,
      email: 'info@heritage.co.za',
      phone: '+27 83 456 7890',
      location: 'Mamelodi, Tshwane'
    },
    status: 'approved',
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Maria L.',
        rating: 5,
        comment: 'Stunning piece! The beadwork is incredibly detailed and authentic.',
        createdAt: '2024-01-12'
      }
    ],
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'Carved Wooden Bowl - Geometric Design',
    price: 350,
  image: '/product-images/bowl.jpeg',
    description: 'Hand-carved wooden bowl with traditional geometric patterns. Perfect for serving or display.',
    category: 'Woodwork',
    vendor: {
      id: 'v3',
      name: 'Ubuntu Woodworks',
      rating: 4.7,
      email: 'ubuntu@wood.co.za',
      phone: '+27 84 789 0123',
      location: 'Soshanguve, Tshwane'
    },
    status: 'approved',
    reviews: [],
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'Ceramic Pot with Earth Tones',
    price: 180,
  image: '/product-images/ceramic-pot-earth.jpg',
    description: 'Handmade ceramic pot with beautiful earth-tone glazes. Functional and decorative.',
    category: 'Pottery',
    vendor: {
      id: 'v4',
      name: 'Clay & Fire Studio',
      rating: 4.6,
      email: 'clay@fire.co.za',
      phone: '+27 85 890 1234',
      location: 'Ga-Rankuwa, Tshwane'
    },
    status: 'pending',
    reviews: [],
    createdAt: '2024-01-04'
  },
  {
    id: '5',
    name: 'Woven Grass Mat - Natural Fiber',
    price: 120,
  image: '/product-images/woven-grass-mat.jpg',
    description: 'Eco-friendly woven grass mat made from locally sourced natural fibers.',
    category: 'Textiles',
    vendor: {
      id: 'v5',
      name: 'Earth Weavers',
      rating: 4.5,
      email: 'earth@weavers.co.za',
      phone: '+27 86 901 2345',
      location: 'Hammanskraal, Tshwane'
    },
    status: 'pending',
    reviews: [],
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'Copper Wire Art Sculpture',
    price: 280,
  image: '/product-images/wire.jpeg',
    description: 'Contemporary copper wire sculpture inspired by traditional African art forms.',
    category: 'Art',
    vendor: {
      id: 'v6',
      name: 'Modern Traditions',
      rating: 4.4,
      email: 'modern@traditions.co.za',
      phone: '+27 87 012 3456',
      location: 'Atteridgeville, Tshwane'
    },
    status: 'approved',
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'John D.',
        rating: 4,
        comment: 'Unique piece that looks great in my office. Well made.',
        createdAt: '2024-01-08'
      }
    ],
    createdAt: '2024-01-06'
  }
];

export const mockVendors = [
  { id: 'v1', name: 'Nomsa Craft Collective', email: 'nomsa@crafts.co.za', status: 'active' },
  { id: 'v2', name: 'Heritage Beadwork', email: 'info@heritage.co.za', status: 'active' },
  { id: 'v3', name: 'Ubuntu Woodworks', email: 'ubuntu@wood.co.za', status: 'active' },
  { id: 'v4', name: 'Clay & Fire Studio', email: 'clay@fire.co.za', status: 'active' },
  { id: 'v5', name: 'Earth Weavers', email: 'earth@weavers.co.za', status: 'pending' },
  { id: 'v6', name: 'Modern Traditions', email: 'modern@traditions.co.za', status: 'active' }
];