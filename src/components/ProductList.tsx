import React from "react";
import { useProfileContext, ProductType } from "./context/ProfileContext";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function ProductList() {
  const { productList } = useProfileContext();
  console.log(productList);
  return (
    <div className="grid  grid-cols-3 xl:grid-cols-4  max-sm:grid-cols-2 mt-4 container  gap-3">
      {productList?.map((product: ProductType, index: string) => {
        return (
          <Dialog>
            <DialogTrigger>
              <div
                className="relative cursor-pointer w-full h-full  "
                key={product.id}
              >
                <Image
                  src={product.url[0]}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover  max-h-[250px] hover:bg-[black]  transition duration-200 ease-in-out relative z-10 "
                />
                <div className="absolute h-full w-full z-20  hover:bg-[#0000003f]  transition duration-200 ease-out top-0 "></div>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-[#ffffffa8] p-0 max-sm:rounded-[20px]">
              <DialogHeader >
                <DialogDescription>
                  <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:text-left ">
                    {product.url.length > 1 ? (
                      <Carousel
                        showStatus={false}
                        useKeyboardArrows={true}
                        dynamicHeight={true}
                        className="w-full h-full"
                        showIndicators={false}
                        emulateTouch={true}
                      >
                        {product.url.map((url: string, index) => {
                          return (
                            <div key={index}>
                              <Image
                                src={url}
                                alt={product.name}
                                height={200}
                                width={200}
                                className="
                              w-full h-full sm:max-w-[300px] max-h-[300px] object-cover"
                              />
                            </div>
                          );
                        })}
                      </Carousel>
                    ) : (
                      <Image
                        src={product.url[0]}
                        alt={product.name}
                        height={200}
                        width={200}
                        className="
                              w-full h-full sm:max-w-[300px] max-h-[300px] object-cover"
                      />
                    )}

                    <div className="py-4  px-6 max-sm:px-3 max-sm:pt-2 text-[black]">
                      <h1 className="text-xl font-semibold capitalize  ">
                        {product.name}
                      </h1>
                      <h1 className="text-sm font-light  leading-6 mt-1">
                        {product.description}
                      </h1>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}

export default ProductList;

// import React from "react";
// import { useProfileContext, ProductType } from "./context/ProfileContext";
// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// function ProductList() {
//   const { productList } = useProfileContext();
//   console.log(productList);
//   return (
//     <>
//       <div className="grid  grid-cols-3 xl:grid-cols-4  max-sm:grid-cols-2 mt-4 container   gap-3">
//         {productList?.map((product: ProductType,index:string) => {
//           return (

//                   <div className="relative cursor-pointer w-full " key={product.id}>
//                     <Image
//                       src={product.url[0]}
//                       alt={product.name}
//                       width={200}
//                       height={200}
//                       className="h-full w-full object-cover max-h-[200px] hover:bg-[black]  transition duration-200 ease-in-out relative z-10 "
//                     />
//                     <div className="absolute h-full w-full z-20  hover:bg-[#0000003f]  transition duration-200 ease-out top-0 "></div>
//                   </div>

//           );
//         })}

//       </div>
//     </>
//   );
// }

// export default ProductList;
