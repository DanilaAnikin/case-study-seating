"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm: React.FC = () => {

  const router = useRouter();

  const handleGoogleSuccess = (credentialResponse: any) => {
    alert("Order successfully sent!");
    router.push("/");
  };

  const handleGoogleFailure = () => {
    alert("Google login failed. Please try again.");
  };

  return (
    <div className="space-y-4 flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
};

export default LoginForm;
