"use client";

import React, { ReactNode, createContext, useContext, useState, FC } from "react";

interface TranslationContextType {
  lang: "cs" | "en";
  t: (key: string) => string;
  setLang: (lang: "cs" | "en") => void;
}

const translations = {
  cs: {
    availableSeats: "Dostupná sedadla",
    rowLabel: "Řada",
    buyTickets: "Koupit vstupenky",
    eventTitle: "Název akce",
    eventDescription: "Popis akce",
    eventDate: "Datum",
    addToCalendar: "Přidat do kalendáře",
    cartTitle: "Košík",
    orderDetails: "Detaily objednávky",
    ticketCount: "Počet vstupenek:",
    totalPrice: "Celková cena:",
    noCartItems: "Žádné položky v košíku, přidejte vstupenky pro pokračování",
    goBack: "Zpět",
    proceedToPayment: "Zaplatit",
    guestCheckout: "Pokračovat jako host",
    loginWithGoogle: "Přihlásit se pomocí Google"
  },
  en: {
    availableSeats: "Available Seats",
    rowLabel: "Row",
    buyTickets: "Buy Tickets",
    eventTitle: "Event Title",
    eventDescription: "Event Description",
    eventDate: "Date",
    addToCalendar: "Add to Calendar",
    cartTitle: "Cart",
    orderDetails: "Order Details",
    ticketCount: "Tickets:",
    totalPrice: "Total:",
    noCartItems: "No items in cart, add to proceed",
    goBack: "Go Back",
    proceedToPayment: "Pay",
    guestCheckout: "Guest Checkout",
    loginWithGoogle: "Login with Google"
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [lang, setLang] = useState<"cs" | "en">("cs");

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ lang, t, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};
