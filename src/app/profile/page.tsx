"use client";
import React, { useEffect } from "react";
import ProductModal from "@/components/ProductModal";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProductList from "@/components/ProductList";
import { useAuth, authContextType } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  useBs,
  bsContextType,
  BusinessInfoType,
} from "@/components/context/BusinessContext";
import {
  useProfileContext,
  ProductType,
  ProfileContextType,
} from "@/components/context/ProfileContext";
function Page() {
  const { user, loading } = useAuth() as authContextType;
  const { isBusiness } = useBs() as bsContextType;
  const { businessInfo } = useBs() as bsContextType;
  const { productList } = useProfileContext() as ProfileContextType;
  const router = useRouter();

  useEffect(() => {
    if (user === null) return router.push("/");
    if (isBusiness == false) return router.push("/");
  }, [user, isBusiness]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="container">
      {businessInfo != null ? (
        <ProfileAvatar businessInfo={businessInfo} />
      ) : null}
      {productList != null ? (
        <ProductList productList={productList}>
          <div className="text-center">
            <ProductModal />
          </div>
        </ProductList>
      ) : null}
    </div>
  );
}

export default Page;
