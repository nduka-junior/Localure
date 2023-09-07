"use client";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { db } from "@/lib/firebase";
import { useAuth, authContextType } from "@/components/context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export interface bsContextType {
  name: string | null;
  isBusiness: boolean;
  businessInfo: BusinessInfoType | null;
  loading: boolean;
}
export interface BusinessInfoType {
  BusinessName: string;
  category: string;
  contact: string;
  date: Date;
  location: string;
  uid: string;
  photoUrl: string;
  id : string
}
export const createBsContext = createContext<bsContextType | null>({
  name: null,
  isBusiness: false,
  businessInfo: null,
  loading: true
});

function BusinessContext({ children }: { children?: React.ReactNode }) {
  const [isBusiness, setIsBusiness] = React.useState<boolean>(false);
  const [businessInfo, setBusinessInfo] =
    React.useState<BusinessInfoType | null>(null);
  const [loading,setLoading] = useState<boolean>(true)
  const { user } = useAuth() as authContextType;
  const router = useRouter();
  console.log(user);

  //
  const checkBusinessInfo = async () => {
    setLoading(true)
    if (user) {
      const businessRef = collection(db, "businessDetails");
      const q = query(businessRef, where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data: BusinessInfoType = doc.data() as BusinessInfoType;

        setBusinessInfo(data);
        // Get the data of the document
        console.log(businessInfo);
        console.log("Document data:", data);
      });
      if (querySnapshot.docs.length == 0) {
    setLoading(false);

        return setIsBusiness(false);
      } else {
        setIsBusiness(true);

      }
    } else {
      setBusinessInfo(null);
      setIsBusiness(true);
    }
    setLoading(false)
  };
  //

  useEffect(() => {
    checkBusinessInfo();
  }, [user, isBusiness]);

  //
  const value: bsContextType = {
    name: "hellos",
    isBusiness,
    businessInfo,
    loading
  };
  //

  return (
    <createBsContext.Provider value={value}>
      {children}
    </createBsContext.Provider>
  );
}

export default BusinessContext;

export const useBs = () => useContext<bsContextType | null>(createBsContext);
