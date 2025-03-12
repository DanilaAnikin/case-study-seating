"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Seat } from "../lib/types";
import PaymentOptions from "../components/PaymentOptions";
import LanguageToggle from "../components/LanguageToggle";
import { useTranslation, TranslationProvider } from "../lib/translation";

interface TicketType {
  id: string;
  name: string;
  price: number;
}

interface CheckoutProps {
  ticketTypes: TicketType[];
}

const CheckoutContent: React.FC<CheckoutProps> = ({ ticketTypes }) => {

  const [cartItems, setCartItems] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart.selectedSeats || []);
      setTotalPrice(parsedCart.totalPrice || 0);
    }
  }, []);

  const numberOfTickets = cartItems.length;

  const handleProceedToPayment = () => {
    alert(t("proceedToPayment"));
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <LanguageToggle />
        <h2 className="text-2xl font-semibold">{t("cartTitle")}</h2>
        <button
          onClick={() => router.push("/")}
          className="text-lg bg-red-800 px-3 py-2 rounded"
        >
          {t("goBack")}
        </button>
      </div>
      
      <div className="border border-gray-400 rounded shadow-md p-6 mb-4">
        <h3 className="text-xl font-semibold mb-4">{t("orderDetails")}</h3>
        {numberOfTickets === 0 ? (
          <p className="text-center text-red-500 font-semibold">
            {t("noCartItems")}
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t("ticketCount")}</span>
              <span>{numberOfTickets}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("totalPrice")}</span>
              <span>
                {totalPrice.toLocaleString(undefined, {
                  style: "currency",
                  currency: "CZK"
                })}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {numberOfTickets > 0 && (
        <div className="flex items-center justify-center gap-2">
          <PaymentOptions />
        </div>
      )}
      
    </div>
  );
};

const Checkout: React.FC<CheckoutProps> = (props) => {
  return (
    <TranslationProvider>
      <CheckoutContent {...props} />
    </TranslationProvider>
  );
};

export default Checkout;
