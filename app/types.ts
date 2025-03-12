export interface Event {
    eventId: string;
    namePub: string;
    description: string;
    currencyIso: string;
    dateFrom: string;
    dateTo: string;
    headerImageUrl: string;
    place: string;
}
  
export interface TicketType {
    id: string;
    name: string;
    price: number;
}
  
export interface Seat {
    seatId: string;
    place: number;
    ticketTypeId: string;
    seatRow: number;
}

export interface SeatRow {
    seatRow: number;
    seats: Seat[];
}

export interface CartState {
    selectedSeats: Seat[];
    addSeat: (seat: Seat) => void;
    removeSeat: (seatId: string) => void;
}

export interface TicketsResponse {
    ticketTypes: TicketType[];
    seatRows: SeatRow[];
}
  
export interface OrderInput {
    eventId: string;
    tickets: {
      ticketTypeId: string;
      seatId: string;
    }[];
    user: {
      email: string;
      firstName: string;
      lastName: string;
    };
}
  
export interface OrderResponse {
    message: string;
    orderId: string;
    tickets: any[];
    user: {
      email: string;
      firstName: string;
      lastName: string;
    };
    totalAmount: number;
}
  