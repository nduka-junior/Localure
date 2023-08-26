"use client";
import { createContext, useContext, useEffect } from "react";
import React from "react";
import { getDocs, collection,query,orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth, authContextType } from "@/components/context/AuthContext";
export interface ProductType {
  name: string;
  price: string;
  url: string[];
  id: string;
  description?: string;
}
export interface ProfileContextType {

  productList: ProductType[] | null;
}

const createProfileContext = createContext<ProfileContextType | null>({
    productList: null,
  
});

function ProfileContext({ children }: { children?: React.ReactNode }) {
  const { user } = useAuth() as authContextType;
  const [productList, setProductList] = React.useState<ProductType[] | null>(
    null
  );

  const getProductList = async () => {
    const productref = collection(db, user?.uid!);
      const q = query(productref, orderBy("date", "desc"));
    // Retrieve documents using the get() method
    const querySnapshot = await getDocs(q);
    const products: ProductType[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = {
        ...doc.data(),

        id: doc.id,
      } as ProductType;
      products.push(data);
      console.log(products);
    });
    setProductList(products);


  };
  useEffect(() => {
    if (user) {
      getProductList();
      console.log(productList);
    }
  }, [user]);
  const value: ProfileContextType = {
    productList,
  };
  return (
    <createProfileContext.Provider value={value}>
      {children}
    </createProfileContext.Provider>
  );
}

export default ProfileContext;

export const useProfileContext = () =>
  useContext<ProfileContextType | null>(createProfileContext);
