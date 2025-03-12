"use client";

import React from "react";
import { useTranslation } from "../lib/translation";

interface CartSummaryProps {
  currencyIso: string;
  selectedSeats: any[];
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ currencyIso, selectedSeats, totalPrice }) => {

  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center border p-4 rounded mt-4">
      <div>
        <p>{t("ticketCount")} {selectedSeats.length}</p>
        <p>
          {t("totalPrice")}{" "}
          {totalPrice.toLocaleString(undefined, {
            style: "currency",
            currency: currencyIso
          })}
        </p>
      </div>
      <a
        href="/checkout"
        className="bg-green-500 text-white px-4 py-2 rounded inline-block mt-2"
      >
        {t("buyTickets")}
      </a>
    </div>
  );
};

export default CartSummary;
