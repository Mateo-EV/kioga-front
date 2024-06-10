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

enum OrderStatus {
  PENDING = "pendiente", // Creado
  PROCCESING = "en espera", // En espera para ser recogido
  SENT = "enviado", // Enviado al cliente
  DELIVERED = "entregado", // Entregado al cliente
  CANCELLED = "cancelado", // Pedido cancelado por el cliente
  REFUNDED = "reembolsado", // Reembolsado por el cliente
}

type Order = {
  id: number;
  code: string;
  name: string;
  amount: number;
  user_id: number;
  payment_method_id: number;
  status: OrderStatus;
  address_id: number;
  notes: string | null;
} & (
  | {
      shipping_amount: 0;
      is_delivery: false;
    }
  | {
      shipping_amount: number;
      is_delivery: true;
    }
);

type OrderProduct = {
  order_id: number;
  product_id: number;
  quantity: number;
  unit_amount: number;
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
