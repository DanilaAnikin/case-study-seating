"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import GuestForm from "./GuestForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useTranslation } from "../lib/translation";

interface PaymentOptionsProps {
  disabled?: boolean;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ disabled = false }) => {

  const [useLogin, setUseLogin] = useState(false);
  const { t } = useTranslation();

  if (disabled) {
    return (
      <div className="p-4 lg:max-w-sm">
        <p className="text-center text-gray-500 font-semibold">{t("noCartItems")}</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:max-w-sm">
      <div className="mb-4">
        <button
          onClick={() => setUseLogin(false)}
          className={`mr-4 px-4 py-2 border rounded ${!useLogin ? "border-blue-500" : "border-transparent"}`}
        >
          {t("guestCheckout")}
        </button>

        <button
          onClick={() => setUseLogin(true)}
          className={`px-4 py-2 border rounded ${useLogin ? "border-blue-500" : "border-transparent"}`}
        >
          {t("loginWithGoogle")}
        </button>
      </div>

      {useLogin ? (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <LoginForm />
        </GoogleOAuthProvider>
      ) : (
        <GuestForm />
      )}
    </div>
  );
};

export default PaymentOptions;
