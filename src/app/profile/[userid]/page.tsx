"use client";
import React, { useEffect, useState } from "react";
import ProductModal from "@/components/ProductModal";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProductList from "@/components/ProductList";
import { useAuth, authContextType } from "@/components/context/AuthContext";
import {
  ProductType,
  ProfileContextType,
} from "@/components/context/ProfileContext";
import { useRouter } from "next/navigation";
import {
  useBs,
  bsContextType,
  BusinessInfoType,
} from "@/components/context/BusinessContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface PageProps {
  params: {
    userid: string;
  };
}
type ErrorType = {
  value: boolean;
  message?: string;
};
function Page({ params: { userid } }: PageProps) {
  const { user, loading } = useAuth() as authContextType;
  const [noDocumentsFound, setNoDocumentsFound] = useState<ErrorType>({
    value: false,
    message: undefined, // You can set a default message if needed
  });
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoType>({
    BusinessName: "",
    category: "",
    contact: "",
    date: new Date(),
    location: "",
    uid: "",
    photoUrl: "",
    id: "",
  });
  const [productList, setProductList] = useState<ProductType[]>([]);
  // const router = useRouter();

  // useEffect(() => {
  //   if (user === null) return router.push("/");
  //   // if (isBusiness == false) return router.push("/");
  // }, [user]);

  // const get authId
  const getAuthId = async (id: string) => {
    const collectionRef = collection(db, "businessDetails");
    const q = query(collectionRef, where("id", "==", id));
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // return <div>User not found</div>
        setNoDocumentsFound({
          value: true,
          message: "User not found",
        });
        console.log("No matching documents.");
      } else {
        let foundId = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data() as BusinessInfoType;
          setBusinessInfo(data);
          setNoDocumentsFound({
            value: false,
            message: "",
          });
          foundId = data.uid; // Assign the ID to the variable
        });
        return foundId;
      }
    } catch (error) {
      console.error("Error searching for documents:", error);
    }
  };
  // get productlist
  const getProductList = async () => {
    const id = await getAuthId(userid);
    if (id) {
      // Only proceed if id is not null or undefined
      const collectionRef = collection(db, id);

      try {
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
          setProductList([]);
        } else {
          querySnapshot.forEach((doc) => {
            const data = doc.data() as ProductType;
          
            setProductList(prev => [...prev,data]);
          });
        }
      } catch (error) {
        console.error("Error searching for documents:", error);
      }
    }
  };
  useEffect(() => {
    (async () => {
      await getProductList();
    })();

  }, [userid]);

  if (loading) return <h1>Loading...</h1>;
  return (
    !noDocumentsFound.value && (
      <div className="container">
        <div>
          <>
            <ProfileAvatar businessInfo={businessInfo} />
            {noDocumentsFound.value && (
              <div className="text-2xl mt-[60px] container">
                {noDocumentsFound.message}
              </div>
            )}
{console.log(productList)}
            <ProductList productList={productList} message="No Posts" />
          </>
        </div>
      </div>
    )
  );
}

export default Page;
