"use client";

import React from "react";
import { useTranslation } from "../lib/translation";

interface EventDetailsProps {
  name: string;
  description: string;
  dateFrom: string;
  headerImageUrl: string;
  place: string;
  currencyIso: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  name,
  description,
  dateFrom,
  headerImageUrl,
  place,
  currencyIso
}) => {

  const { t } = useTranslation();

  const handleAddToCalendar = () => {
    const start =
      new Date(dateFrom)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    const text = encodeURIComponent(name);
    const details = encodeURIComponent(description);
    const location = encodeURIComponent(place);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${start}&details=${details}&location=${location}`;
    
    window.open(calendarUrl, "_blank");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <img
        src={headerImageUrl}
        alt="Event Banner"
        className="object-cover rounded mb-4"
      />
      <p className="mb-4">{description}</p>
      <p className="mb-4">Datum: {new Date(dateFrom).toLocaleString()}</p>
      <button
        onClick={handleAddToCalendar}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {t("addToCalendar")}
      </button>
    </div>
  );
};

export default EventDetails;
