export type Json = Record<string, string>;

export type SiteContent = {
  key: string;
  label: string | null;
  value: Json;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  price_from: number | null;
  price_label: string | null;
  duration: string | null;
  image_url: string | null;
  icon: string | null;
  highlights: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  currency: string;
  category_id: string | null;
  image_url: string | null;
  gallery: string[];
  in_stock: boolean;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  product_categories?: { name: string; slug: string } | null;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  quote: string;
  avatar_url: string | null;
  source: string;
  is_active: boolean;
  sort_order: number;
};

export type GalleryImage = {
  id: string;
  title: string | null;
  image_url: string;
  is_active: boolean;
  sort_order: number;
};

export type Booking = {
  id: string;
  reference: string;
  full_name: string;
  phone: string;
  email: string | null;
  service_id: string | null;
  service_name: string | null;
  preferred_date: string;
  preferred_time: string;
  stylist: string | null;
  notes: string | null;
  status: "new" | "confirmed" | "completed" | "cancelled";
  created_at: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  reference: string;
  customer_name: string | null;
  phone: string | null;
  items: OrderItem[];
  total: number;
  currency: string;
  status: "new" | "confirmed" | "fulfilled" | "cancelled";
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
