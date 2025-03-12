import { create } from "zustand";
import { Seat } from "../lib/types";

interface CartState {
  selectedSeats: Seat[];
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  selectedSeats: [],
  
  addSeat: (seat) => 
    set((state) => ({ selectedSeats: [...state.selectedSeats, seat] })),
  
  removeSeat: (seatId) =>
    set((state) => ({ 
      selectedSeats: state.selectedSeats.filter((s) => s.seatId !== seatId)
    })),
  
  clearCart: () => set({ selectedSeats: [] })
}));
