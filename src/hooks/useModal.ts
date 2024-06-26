import { create } from "zustand";

export type OrderResponse = Order & {
  details: (OrderProduct & { product: Product })[];
  address: Address;
} & TimeStamps;

export type ModalOrderDetails = {
  type: "order-details";
  data: OrderResponse;
};

type ModalStore = {
  isOpen: boolean;
  open: (state: Pick<ModalStore, "type" | "data">) => void;
  close: () => void;
} & (
  | {
      type: null;
      data: null;
    }
  | ModalOrderDetails
);

export const useModal = create<ModalStore>((set) => ({
  open: (state) => set({ ...state, isOpen: true } as ModalStore),
  close: () => set({ isOpen: false }),
  isOpen: false,
  type: null,
  data: null,
}));
