"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GuestForm: React.FC = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleGuestCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order successfully sent!");
    router.push("/");
  };

  return (
    <form
      onSubmit={handleGuestCheckout}
      className="space-y-4 flex flex-col items-center text-gray-800"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 w-full"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Proceed as Guest
      </button>
    </form>
  );
};

export default GuestForm;
