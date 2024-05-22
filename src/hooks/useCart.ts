import { type products } from "@/config/const";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductCart = (typeof products)[number] & {
  quantity: number;
};

type useCartProps = {
  products: ProductCart[];
  addProduct: (product: ProductCart) => void;
  removeProduct: (productId: number) => void;
  removeAllProducts: () => void;
};

export const useCart = create<useCartProps>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set(({ products: prevProducts }) => ({
          products: [...prevProducts, product],
        })),
      removeProduct: (productId) =>
        set(({ products: prevProducts }) => {
          const products = [...prevProducts];
          const indexToDelete = prevProducts.findIndex(
            (p) => p.id === productId,
          );
          products.splice(indexToDelete, 1);
          return { products };
        }),
      removeAllProducts: () => set({ products: [] }),
    }),
    { name: "cart-data" },
  ),
);
