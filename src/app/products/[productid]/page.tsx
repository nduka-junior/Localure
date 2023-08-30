import React from "react";

function page({ productid }: { productid: string }) {
  return (
    <div className="text-2xl text-center">
      productid @{`${productid}`}
      Coming soon ......
    </div>
  );
}

export default page;
