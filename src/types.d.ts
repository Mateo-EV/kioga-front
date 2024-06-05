type Session = {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
  category_id: number;
  subcategory_id: number;
  price_discounted: number;
  brand_id: number;
  is_active: boolean;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

type Subcategory = {
  id: number;
  name: string;
  slug: string;
};

type Brand = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

// Cursor Pagination
type CursorPagination<T> = {
  data: T[];
  path: string;
  per_page: number;
  next_cursor: string | null;
  next_page_url: string | null;
  prev_cursor: string | null;
  prev_page_url: string | null;
};
