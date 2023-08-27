"use client";
import React, { useEffect } from "react";
import ProductModal from "@/components/ProductModal";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProductList from "@/components/ProductList";
import { useAuth, authContextType } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useBs, bsContextType } from "@/components/context/BusinessContext";

function Page() {
  const { user, loading } = useAuth() as authContextType;
  const { isBusiness } = useBs() as bsContextType;

  const router = useRouter();

  useEffect(() => {
    if (user === null) return router.push("/");
    if (isBusiness == false) return router.push("/");
  }, [user, isBusiness]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="container">
      <ProfileAvatar />

      <ProductList />
    </div>
  );
}

export default Page;
