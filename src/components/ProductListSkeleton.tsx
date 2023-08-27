import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProductListSkeleton() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-center space-y-3">
        <Skeleton className="h-5 w-[100px]" />

        <Skeleton className="h-7 w-[100px]" />
      </div>
      <div className="grid  grid-cols-3 xl:grid-cols-4  max-sm:grid-cols-2 mt-4 container  gap-1">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  );
}

export default ProductListSkeleton;
