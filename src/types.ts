export interface DigitalProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  features: string[];
  image: string;
  rating: number;
  salesCount: number;
  fileSize: string;
  fileFormat: string;
}

export interface DigitalService {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  deliveryTime: string;
  features: string[];
  iconName: string;
}

export interface CartItem {
  product: DigitalProduct;
  quantity: number;
}

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  stats: { label: string; value: string };
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  feedback: string;
  rating: number;
  avatar: string;
}
