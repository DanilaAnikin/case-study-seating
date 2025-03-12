"use client";

import React, { useEffect, useState } from "react";
import { Seat } from "../lib/types";
import { useTranslation } from "../lib/translation";

interface Props {
  seats: Seat[];
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  ticketTypes: { id: string; name: string; price: number }[];
}

const SeatingMap: React.FC<Props> = ({
  seats,
  selectedSeats,
  onToggleSeat,
  ticketTypes,
}) => {
  const { t } = useTranslation();
  const [storedCart, setStoredCart] = useState<Seat[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const { selectedSeats } = JSON.parse(savedCart);
      setStoredCart(selectedSeats || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify({ selectedSeats, totalPrice: calculateTotalPrice() })
    );
  }, [selectedSeats]);

  const handleToggleSeat = (seat: Seat) => {
    let updatedSeats = [...selectedSeats];
    const seatIndex = updatedSeats.findIndex((s) => s.seatId === seat.seatId);

    if (seatIndex === -1) {
      updatedSeats.push(seat);
    } else {
      updatedSeats.splice(seatIndex, 1);
    }

    onToggleSeat(seat);
    setStoredCart(updatedSeats);
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatTicket = ticketTypes.find(
        (type) => type.id === seat.ticketTypeId
      );
      return total + (seatTicket ? seatTicket.price : 0);
    }, 0);
  };

  const rows = seats.reduce((acc: { [key: number]: Seat[] }, seat) => {
    if (!acc[seat.seatRow]) {
      acc[seat.seatRow] = [];
    }
    acc[seat.seatRow].push(seat);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {Object.keys(rows).map((rowKey) => {
        const rowNumber = parseInt(rowKey);
        const rowSeats = rows[rowNumber];
        const maxSeat = Math.max(...rowSeats.map((s) => s.place));
        const fullRow = Array.from({ length: maxSeat }, (_, i) => {
          const seatNumber = i + 1;
          return rowSeats.find((seat) => seat.place === seatNumber) || null;
        });

        return (
          <div key={rowNumber} className="flex items-center mb-2">
            <span className="w-16 font-bold">
              {t("rowLabel")} {rowNumber}
            </span>
            <div className="flex space-x-2">
              {fullRow.map((seat, index) =>
                seat ? (
                  (() => {
                    const seatType = ticketTypes.find(
                      (type) => type.id === seat.ticketTypeId
                    );
                    const borderClass =
                      seatType?.name === "VIP ticket"
                        ? "border-yellow-500"
                        : "border-gray-300";
                    const vipText =
                      seatType?.name === "VIP ticket" ? "VIP" : "";
                    const selectedClass = selectedSeats.some(
                      (s) => s.seatId === seat.seatId
                    )
                      ? "text-white bg-green-700 border-green-500"
                      : "";
                    return (
                      <button
                        key={seat.seatId}
                        onClick={() => handleToggleSeat(seat)}
                        className={`w-10 h-10 rounded border text-sm ${borderClass} ${selectedClass}`}
                        title={`Sedadlo ${seat.place}`}
                      >
                        <p className="text-xs text-yellow-600">{vipText}</p>
                        {seat.place}
                      </button>
                    );
                  })()
                ) : (
                  <div
                    key={index}
                    className="w-10 h-10 border rounded opacity-30"
                  ></div>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeatingMap;
