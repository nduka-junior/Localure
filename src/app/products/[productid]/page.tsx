import React from "react";

function Page({ params }: { params: { productid: string } }) {
  return (
    <div className="text-2xl text-center">
      productid @{`${params.productid}`}
      Coming soon ......
    </div>
  );
}

export default Page;
