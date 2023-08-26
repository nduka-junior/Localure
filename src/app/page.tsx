"use client";
import BusinessForm from "@/components/BusinessForm";
import { useAuth } from "@/components/context/AuthContext";
import React from "react";
import { useBs } from "@/components/context/BusinessContext";

export default function Page() {
  const { isBusiness }: { isBusiness: boolean } = useBs() ?? {
    isBusiness: false,
  };

  console.log(isBusiness);
  return (
    <div className="mt-7">
      <div className="container">
        {isBusiness && <BusinessForm /> }
      </div>
    </div>
  );
}
