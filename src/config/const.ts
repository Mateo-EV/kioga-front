export const colors = {
  primary: "#ff6600",
  secondary: "#ffffa1",
  extra: "#ff983f",
};

export const navItemsContent = [
  {
    content: "Componentes",
    extra: [
      {
        title: "Cases · Gabinetes",
        links: [
          {
            href: "/categorias/cases?tipo=con-fuente",
            text: "Con fuente",
          },
          {
            href: "/categorias/cases?tipo=sin-fuente",
            text: "Sin fuente",
          },
          {
            href: "/categorias/cases?tipo=accesorios",
            text: "Accesorios",
          },
        ],
      },
      {
        title: "Placas · Motherboards",
        links: [
          {
            href: "/categorias/placas?tipo=amd",
            text: "AMD",
          },
          {
            href: "/categorias/placas?tipo=intel",
            text: "Intel",
          },
        ],
      },
      {
        title: "Procesadores",
        links: [
          {
            href: "/categorias/procesadores?tipo=amd",
            text: "AMD",
          },
          {
            href: "/categorias/procesadores?tipo=intel",
            text: "Intel",
          },
        ],
      },
      {
        title: "Memoria Ram",
        links: [
          {
            href: "/categorias/memoria-ram?tipo=ram-dimm-escritorio",
            text: "Escritorio",
          },
          {
            href: "/categorias/memoria-ram?tipo=ram-sodimm-laptops",
            text: "Laptops",
          },
        ],
      },
      {
        title: "Almacenamiento",
        links: [
          {
            href: "/categorias/almacenamiento?tipo=sdd-sata",
            text: "SDD SATA",
          },
          {
            href: "/categorias/almacenamiento?tipo=sdd-m2-nvme",
            text: "SSD NVME",
          },
          {
            href: "/categorias/almacenamiento?tipo=hdd",
            text: "HDD",
          },
        ],
      },
      {
        title: "Tarjetas de Video",
        links: [
          {
            href: "/categorias/tarjetas-de-video?tipo=nvidia",
            text: "Nvidia",
          },
          {
            href: "/categorias/tarjetas-de-video?tipo=amd",
            text: "AMD",
          },
        ],
      },
      {
        title: "Refrigeración · Enfriamiento",
        links: [
          {
            href: "/categorias/refrigeracion?tipo=liquido",
            text: "Líquido",
          },
          {
            href: "/categorias/refrigeracion?tipo=aire",
            text: "Aire",
          },
        ],
      },
      {
        title: "Fuentes",
        links: [
          {
            href: "/categorias/fuentes",
            text: "Certificadas 80+",
          },
        ],
      },
      {
        title: "Pasta Térmica",
        links: [
          {
            href: "/categorias/pasta-termica",
            text: "Ver Todo",
          },
        ],
      },
    ],
  },
  {
    content: "Periféricos",
    links: [
      {
        href: "/categorias/perifericos?tipo=mouse",
        text: "Mouse",
      },
      {
        href: "/categorias/perifericos?tipo=teclados",
        text: "Teclados",
      },
      {
        href: "/categorias/perifericos?tipo=audifonos",
        text: "Audifonos",
      },
      {
        href: "/categorias/perifericos?tipo=mousepads",
        text: "Mousepads",
      },
      {
        href: "/categorias/perifericos?tipo=microfonos",
        text: "Microfonos",
      },
      {
        href: "/categorias/perifericos?tipo=mandos-joysticks",
        text: "Mandos",
      },
      {
        href: "/categorias/perifericos?tipo=webcams",
        text: "Webcams",
      },
      {
        href: "/categorias/perifericos?tipo=combos-packs",
        text: "Packs",
      },
      {
        href: "/categorias/perifericos?tipo=accesorios-de-teclado",
        text: "Accesorios de teclado",
      },
    ],
  },
  {
    content: "Otros",
    links: [
      {
        href: "/categorias/monitores",
        text: "Monitores",
      },
      {
        href: "/categorias/escritorios",
        text: "Escritorios",
      },
      {
        href: "/categorias/estabilizadores",
        text: "Estabilizadores",
      },
      {
        href: "/categorias/laptops",
        text: "Laptops",
      },
    ],
  },
];

export const aboutUsData = [
  {
    title: "Calidad",
    content:
      "Nos comprometemos a ofrecer productos de alta calidad y rendimiento",
  },
  {
    title: "Compromiso",
    content:
      "Trabajamos con dedicación y responsabilidad para superar las expectativas de nuestros clientes",
  },
  {
    title: "Innovación",
    content:
      "Buscamos constantemente nuevas tecnologías y soluciones para mejorar la experiencia de nuestros clientes",
  },
  {
    title: "Ética",
    content:
      "Operamos de manera ética y transparente en todas nuestras acciones",
  },
];

export enum OrderStatus {
  PENDING = "Pendiente", // Creado
  WAITING = "En Espera", // En espera para ser recogido
  SENT = "Enviado", // Enviado al cliente
  DELIVERED = "Entregado", // Entregado al cliente
  CANCELLED = "Cancelado", // Pedido cancelado por el cliente
  REFUNDED = "Reembolsado", // Reembolsado por el cliente
}

export const OrderStatusVariants = {
  [OrderStatus.PENDING]: "pendient",
  [OrderStatus.WAITING]: "info",
  [OrderStatus.SENT]: "default",
  [OrderStatus.DELIVERED]: "success",
  [OrderStatus.CANCELLED]: "destructive",
  [OrderStatus.REFUNDED]: "outline",
} as const;

export const OrderStatusDataBar = {
  [OrderStatus.PENDING]: [{ value: 1 }, { value: 9 }],
  [OrderStatus.WAITING]: [{ value: 8 }, { value: 2 }],
  [OrderStatus.SENT]: [{ value: 5 }, { value: 5 }],
  [OrderStatus.DELIVERED]: [{ value: 10 }, { value: 0 }],
  [OrderStatus.CANCELLED]: [{ value: 10 }, { value: 0 }],
  [OrderStatus.REFUNDED]: [{ value: 10 }, { value: 0 }],
} as const;

export const OrderStatusFillColor = {
  [OrderStatus.PENDING]: "fill-gray-500",
  [OrderStatus.WAITING]: "fill-blue-500",
  [OrderStatus.SENT]: "fill-primary",
  [OrderStatus.DELIVERED]: "fill-green-500",
  [OrderStatus.CANCELLED]: "fill-destructive",
  [OrderStatus.REFUNDED]: "fill-muted",
} as const;

export const OrderStatusStrokeColor = {
  [OrderStatus.PENDING]: "stroke-gray-500",
  [OrderStatus.WAITING]: "stroke-blue-500",
  [OrderStatus.SENT]: "stroke-primary",
  [OrderStatus.DELIVERED]: "stroke-green-500",
  [OrderStatus.CANCELLED]: "stroke-destructive",
  [OrderStatus.REFUNDED]: "stroke-muted",
} as const;

export const OrderStatusTextColor = {
  [OrderStatus.PENDING]: "text-gray-500",
  [OrderStatus.WAITING]: "text-blue-500",
  [OrderStatus.SENT]: "text-primary",
  [OrderStatus.DELIVERED]: "text-green-500",
  [OrderStatus.CANCELLED]: "text-destructive",
  [OrderStatus.REFUNDED]: "text-muted",
} as const;
