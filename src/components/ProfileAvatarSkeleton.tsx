import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileAvatarSkeleton() {
  return (
    <div
      className="flex 
    items-start  justify-center mt-5 mb-10 gap-4 "
    >
      <div className="relative  mr-2  ">
        <Skeleton className="w-[100px] h-[100px] rounded-full" />
      </div>

      <section className="w-full space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-4 w-[90px]" />
        <Skeleton className="h-4 w-[250px]" />
      </section>
    </div>
    // <div>

    // </div>
  );
}
