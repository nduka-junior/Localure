"use client";
import BusinessForm from "@/components/BusinessForm";
import { useAuth } from "@/components/context/AuthContext";
import React from "react";
import { useBs } from "@/components/context/BusinessContext";

export default function Home() {
  const { name }: { name: string } = useAuth();
  const { isBusiness }: { isBusiness: boolean } = useBs();

  console.log(isBusiness);
  return (
    <div className="mt-7">
      <div className="container">
        {
          isBusiness ?  <BusinessForm /> : <h1>hello</h1>
       }
      </div>
    </div>
  );
}
