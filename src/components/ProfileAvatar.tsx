import React from "react";
import { authContextType, useAuth } from "./context/AuthContext";
import { useProfileContext } from "./context/ProfileContext";
import Image from "next/image";
import { useBs, bsContextType } from "./context/BusinessContext";
import ProfileAvatarSkeleton from "@/components/ProfileAvatarSkeleton";
function ProfileAvatar() {
  const { user, loading } = useAuth() as authContextType;
  const { businessInfo } = useBs() as bsContextType;
  console.log(user);

  //
  if (loading || (businessInfo == null ) ) return <ProfileAvatarSkeleton />;
  //

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
        <h1 className="text-[13px]">{businessInfo?.contact}</h1>
        <h1 className="text-[13px]">{businessInfo?.location}</h1>
      </section>
    </div>
  );
}

export default ProfileAvatar;
