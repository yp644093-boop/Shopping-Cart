// Product Data - Mock Database
const productsDatabase = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 128,
    description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality.",
    stock: 25
  },
  {
    id: 2,
    name: "USB-C Cable",
    category: "electronics",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 542,
    description: "Fast charging USB-C cable, 2 meters long, compatible with all USB-C devices.",
    stock: 50
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "accessories",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 89,
    description: "Adjustable aluminum laptop stand for improved ergonomics and better screen viewing angle.",
    stock: 18
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    category: "electronics",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 234,
    description: "RGB mechanical keyboard with custom switches and programmable keys for gaming and productivity.",
    stock: 15
  },
  {
    id: 5,
    name: "Wireless Mouse",
    category: "electronics",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 156,
    description: "Ergonomic wireless mouse with precision tracking and 18-month battery life.",
    stock: 32
  },
  {
    id: 6,
    name: "Phone Case",
    category: "accessories",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1585798446857-a2a50d1b10e7?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 312,
    description: "Durable phone case with military-grade protection and sleek design.",
    stock: 45
  },
  {
    id: 7,
    name: "Screen Protector (3 Pack)",
    category: "accessories",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1599921841528-0fb37e1bcd15?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 428,
    description: "Tempered glass screen protectors, ultra-thin with easy installation and crystal clear view.",
    stock: 60
  },
  {
    id: 8,
    name: "Portable Power Bank",
    category: "electronics",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1606933248051-5ce98adc63d0?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 287,
    description: "20000mAh portable power bank with fast charging and dual USB ports.",
    stock: 28
  },
  {
    id: 9,
    name: "Webcam HD",
    category: "electronics",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 165,
    description: "1080p HD webcam with auto-focus and built-in microphone for crystal clear video calls.",
    stock: 20
  },
  {
    id: 10,
    name: "Desk Lamp",
    category: "accessories",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1565636192335-14f07d1aab9c?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 203,
    description: "LED desk lamp with adjustable brightness and color temperature for comfortable workspace.",
    stock: 22
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    category: "electronics",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 345,
    description: "Portable Bluetooth speaker with 12-hour battery life, IPX7 waterproof rating and 360° sound.",
    stock: 19
  },
  {
    id: 12,
    name: "USB Hub",
    category: "electronics",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 198,
    description: "7-port USB hub with individual switches and fast charging capabilities.",
    stock: 35
  },
  {
    id: 13,
    name: "Monitor Arm Mount",
    category: "accessories",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 112,
    description: "Adjustable monitor arm mount with smooth articulation and VESA compatibility.",
    stock: 14
  },
  {
    id: 14,
    name: "Cable Organizer Set",
    category: "accessories",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 156,
    description: "Cable management organizer clips and sleeves for clean desk setup.",
    stock: 48
  },
  {
    id: 15,
    name: "Phone Stand",
    category: "accessories",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1591290621749-2127be44b724?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 267,
    description: "Adjustable phone stand for desk with non-slip base and 270° rotation.",
    stock: 52
  }
];
