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
  id: number;
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

// Nexted Object
type Primitive = string | number | boolean;
type NestedArray = Primitive[] | NestedObject[];

type NestedObject = {
  [key: string]: Primitive | NestedArray | NestedObject;
};

// Mercado Pago API
type MercadoPagoPreference = {
  id: string;
  items: MercadoPagoItem[];
  payer: MercadoPagoPayer;
  client_id: string;
  payment_methods: MercadoPagoPaymentMethods;
  back_urls: MercadoPagoUrls;
  redirect_urls: MercadoPagoUrls;
  shipments: MercadoPagoShipments;
  notification_url: string | null;
  statement_descriptor: string;
  external_reference: string;
  expires: boolean;
  date_of_expiration: string | null;
  expiration_date_from: string | null;
  expiration_date_to: string | null;
  collector_id: number;
  marketplace: string;
  marketplace_fee: number;
  additional_info: string;
  auto_return: string;
  operation_type: string;
  processing_modes: string | null;
  binary_mode: boolean;
  metadata: any[];
  init_point: string;
  sandbox_init_point: string;
  date_created: Date;
  coupon_code: string | null;
  coupon_labels: string | null;
  internal_metadata: string | null;
  site_id: string;
  product_id: string | null;
  last_updated: string | null;
  total_amount: string | null;
  headers: string | null;
  created_source: string | null;
  created_by_app: string | null;
  map: MercadoPagoPreferenceMap;
  financing_group: string;
};

type MercadoPagoUrls = {
  success: string;
  pending: string;
  failure: string;
};

type MercadoPagoItem = {
  id: string;
  title: string;
  description: string;
  category_id: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
};

type MercadoPagoPreferenceMap = {
  items: string;
  payer: string;
  payment_methods: string;
  back_urls: string;
  redirect_urls: string;
  shipments: string;
  differential_pricing: string;
  taxes: string;
  tracks: string;
};

type MercadoPagoPayer = {
  name: string;
  surname: string;
  email: string;
  phone: Phone;
  identification: Identification;
  address: Address;
  date_created: string | null;
  last_purchase: string | null;
};

type MercadoPagoAddress = {
  zip_code: string;
  street_name: string;
  street_number: string | null;
};

type MercadoPagoIdentification = {
  type: string;
  number: string;
};

type MercadoPagoPhone = {
  area_code: string;
  number: string;
};

type MercadoPagoPaymentMethods = {
  default_payment_method_id: string | null;
  installments: number;
  default_installments: number;
  excluded_payment_methods: MercadoPagoExcludedPayment[];
  excluded_payment_types: MercadoPagoExcludedPayment[];
  default_card_id: string | null;
};

type MercadoPagoExcludedPayment = {
  id: string;
};

type MercadoPagoShipments = {
  default_shipping_method: string | null;
  receiver_address: {
    zip_code: string;
    street_name: string;
    street_number: string | null;
    country_name: string | null;
    state_name: string | null;
    floor: string;
    apartment: string;
    city_name: string | null;
  };
  map: {
    free_methods: string;
    receiver_address: string;
  };
};
