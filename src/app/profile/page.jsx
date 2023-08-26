"use client"
import React from "react";

import ProductModal from "@/components/ProductModal";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProductList from "@/components/ProductList";
function Page() {

  return (
    <div className="container">
      <ProfileAvatar />
      <div className="text-center">
        <h1>Add a Prouduct</h1>
        <ProductModal />
      </div>
      <ProductList />
    </div>
  );
}

export default Page;
