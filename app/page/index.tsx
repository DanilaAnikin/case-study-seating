"use client";

import React, { useEffect, useState } from "react";
import { fetchEventDetails, fetchEventTickets } from "../lib/api";
import { useTranslation } from "../lib/translation";
import EventDetails from "../components/EventDetails";
import SeatingMap from "../components/SeatingMap";
import CartSummary from "../components/CartSummary";
import LanguageToggle from "../components/LanguageToggle";
import { useCartStore } from "../store/cartStore";

interface TicketType {
  id: string;
  name: string;
  price: number;
}

interface SeatData {
  seatId: string;
  place: number;
  ticketTypeId: string;
  seatRow: number;
}

interface SeatRow {
  seatRow: number;
  seats: SeatData[];
}

interface TicketsResponse {
  ticketTypes: TicketType[];
  seatRows: SeatRow[];
}

const IndexPage: React.FC = () => {
  const { t } = useTranslation();
  const [event, setEvent] = useState<any>(null);
  const [tickets, setTickets] = useState<TicketsResponse | null>(null);
  const { addSeat, removeSeat, selectedSeats } = useCartStore();

  useEffect(() => {
    async function loadData() {
      const eventData = await fetchEventDetails();
      setEvent(eventData);
      const ticketsData = await fetchEventTickets(eventData.eventId);
      ticketsData.seatRows.forEach((row: SeatRow) => {
        row.seats.sort((a, b) => a.place - b.place);
      });
      setTickets(ticketsData);
    }
    loadData();
  }, []);

  const toggleSeat = (seat: SeatData) => {
    const exists = selectedSeats.find((s) => s.seatId === seat.seatId);
    
    if (exists) {
      removeSeat(seat.seatId);
    } else {
      addSeat(seat);
    }
  };

  const flattenedSeats = tickets
    ? tickets.seatRows.flatMap((row) =>
        row.seats.map((seat) => ({ ...seat, seatRow: row.seatRow }))
      )
    : [];

  const totalPrice = selectedSeats.reduce((total, seat) => {
    const ticketType = seat.ticketTypeId;
    const seatTicket = tickets?.ticketTypes.find((type) => type.id === ticketType);
    return total + (seatTicket ? seatTicket.price : 0);
  }, 0);

  return (
    <div className="p-4">
      
      <div className="flex justify-between items-center mb-4">
        <LanguageToggle />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {tickets && (
            <>
              <h2 className="text-xl font-semibold mb-4">{t("availableSeats")}</h2>
              <SeatingMap
                seats={flattenedSeats}
                selectedSeats={selectedSeats}
                onToggleSeat={toggleSeat}
                ticketTypes={tickets.ticketTypes}
              />
            </>
          )}
        </div>
        
        <div className="flex-1">
          {event && (
            <EventDetails
              name={event.namePub}
              description={event.description}
              dateFrom={event.dateFrom}
              headerImageUrl={event.headerImageUrl}
              place={event.place}
              currencyIso={event.currencyIso}
            />
          )}
        </div>
      </div>
      
      {event && (
        <CartSummary
          currencyIso={event.currencyIso}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
        />
      )}
      
    </div>
  );
};

export default IndexPage;
