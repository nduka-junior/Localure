"use client";
import BusinessForm from "@/components/BusinessForm";
import React from "react";
import { useBs, bsContextType } from "@/components/context/BusinessContext";

export default function Page() {
  const { isBusiness } = useBs()  as bsContextType
  
  console.log(isBusiness);
  return (
    <div className="mt-7">
      <div className="container">
        {isBusiness ? <h1 className="container text-center text-2xl">Feed page coming soon...</h1> : <BusinessForm /> }
      </div>
    </div>
  );
}
