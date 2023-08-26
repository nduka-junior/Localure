"use client";
import BusinessForm from "@/components/BusinessForm";
import { useAuth } from "@/components/context/AuthContext";
import React from "react";
import { useBs, bsContextType } from "@/components/context/BusinessContext";

export default function Page() {
  const { isBusiness } = useBs()  as bsContextType

  console.log(isBusiness);
  return (
    <div className="mt-7">
      <div className="container">
        {isBusiness && <BusinessForm /> }
      </div>
    </div>
  );
}
