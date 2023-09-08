import React from "react";
import { authContextType, useAuth } from "./context/AuthContext";
import { useProfileContext } from "./context/ProfileContext";
import Image from "next/image";
import {
  useBs,
  bsContextType,
  BusinessInfoType,
} from "./context/BusinessContext";
import ProfileAvatarSkeleton from "@/components/ProfileAvatarSkeleton";

interface PageProps {
  businessInfo: BusinessInfoType;
}

function ProfileAvatar({ businessInfo }: PageProps) {
  const {  loading } = useAuth() as authContextType;


  //
  if (loading || businessInfo == null) return <ProfileAvatarSkeleton />;
  //

  return (
    businessInfo && (
      <div
        className="flex 
    items-start  max-sm:flex-col max-sm:items-center  justify-center mt-5 mb-10 gap-4 "
      >
        <div className="relative  mr-2  ">
          {businessInfo?.photoUrl && (
            <Image
              src={businessInfo?.photoUrl}
              alt="Profile pic"
              width={150}
              height={150}
              className="rounded-full object-center sm:w-[80px] "
              style={{
                minHeight: "110px",
                minWidth: "110px",
                maxHeight: "160px",
                maxWidth: "160px",
              }}
            />
          )}
        </div>

        <section className="w-full max-sm:items-center max-sm:flex max-sm:flex-col ">
          <h1 className="text-2xl font-medium ">
            {businessInfo?.BusinessName}
          </h1>
          <h1>{businessInfo?.category}</h1>
          <h1 className="text-[13px]">{businessInfo?.contact}</h1>
          <h1 className="text-[13px] max-w-[50%] max-sm:text-center">
            {businessInfo?.location}
          </h1>
        </section>
      </div>
    )
  );
}

export default ProfileAvatar;
