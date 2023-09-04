"use client";
import BusinessForm from "@/components/BusinessForm";
import React from "react";
import { useBs, bsContextType } from "@/components/context/BusinessContext";

export default function Page() {
  const { isBusiness, loading } = useBs() as bsContextType;

  console.log(isBusiness);
  if (loading)
    return <div className="text-2xl text-center mt-7">Loading....</div>;
  return (
    <div className="mt-7">
      <div className="container">
        {isBusiness ? (
          <h1 className="container text-center text-2xl">
            Feed page coming soon...
          </h1>
        ) : (
          <BusinessForm />
        )}
      </div>
    </div>
  );
}
