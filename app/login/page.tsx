"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="p-4">
        <LoginForm />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
