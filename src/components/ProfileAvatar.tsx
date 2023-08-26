import React from "react";
import { useAuth } from "./context/AuthContext";
import { useProfileContext } from "./context/ProfileContext";
import Image from "next/image";
import { useBs } from "./context/BusinessContext";
function ProfileAvatar() {
  const { name } = useProfileContext();
  const { user,loading } = useAuth();
  const { businessInfo } = useBs();
    console.log(businessInfo);
    if (loading && businessInfo)  return <h1>loading</h1>;
  return businessInfo && (
    <div
      className="flex 
    items-start  justify-center mt-5 mb-10 gap-4 "
    >
      <div className="relative  mr-2  ">
        <Image
          src={user?.photoURL ?? ""}
          alt="Profile pic"
          width={100}
          height={100}
          className="rounded-full w-[100%] h-[100%]  "
          style={{
            minHeight: "100px",
            minWidth: "100px",
            maxHeight: "150px",
            maxWidth: "150px",
          }}
        />
      </div>

      <section className="w-full">
        <h1 className="text-2xl font-medium ">{businessInfo?.BusinessName}</h1>
        <h1>{businessInfo?.category}</h1>
        <h1 className="text-xs">{businessInfo?.contact}</h1>
        <h1 className="text-xs">{businessInfo?.location}</h1>
      </section>
    </div>
  );
}

export default ProfileAvatar;
