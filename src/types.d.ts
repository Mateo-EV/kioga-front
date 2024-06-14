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
  PENDING = "Pendiente", // Creado
  WAITING = "En Espera", // En espera para ser recogido
  SENT = "Enviado", // Enviado al cliente
  DELIVERED = "Entregado", // Entregado al cliente
  CANCELLED = "Cancelado", // Pedido cancelado por el cliente
  REFUNDED = "Reembolsado", // Reembolsado por el cliente
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

type Address = {
  user_id: number;
  first_name: string;
  last_name: string;
  dni: string;
  phone: string;
  department: string;
  province: string;
  district: string;
  street_address: string;
  zip_code: string;
  reference: string;
};

type TimeStamps = {
  created_at: string;
  updated_at: string;
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
