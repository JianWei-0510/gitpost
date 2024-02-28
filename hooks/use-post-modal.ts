import { create } from "zustand";

interface PostDataType {
  title?: string;
  body?: string;
  url?: string;
}

interface useProModalStore {
  data: PostDataType;
  isOpen: boolean;
  onOpen: (data?: PostDataType) => void;
  onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
  data: {},
  isOpen: false,
  onOpen: (data = {}) => {
    set({ isOpen: true, data });
  },
  onClose: () => set({ isOpen: false, data: {} }),
}));
