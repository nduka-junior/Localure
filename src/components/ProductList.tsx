import React from "react";
import {
  useProfileContext,
  ProductType,
  ProfileContextType,
} from "./context/ProfileContext";
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
import ProductModal from "@/components/ProductModal";
import ProductListSkeleton from "./ProductListSkeleton";

function ProductList() {
  const { productList } = useProfileContext() as ProfileContextType;

  //
  if (productList === null) return  <ProductListSkeleton />
  if (productList?.length === 0)
    return (
      <div className="text-xl text-center mt-5">
        You have not added any product
      </div>
    );

  //
  return (
    <>
      <div className="text-center">
        <h1>Add a product</h1>
        <ProductModal />
      </div>
      <div className="grid  grid-cols-3 xl:grid-cols-4  max-sm:grid-cols-2 mt-4 container  gap-1">
        {productList?.map((product: ProductType, index: number) => {
          return (
            <Dialog key={index}>
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
              <DialogContent className="bg-[#ffffffa8] p-0 max-sm:rounded-[15px] w-auto">
                <DialogHeader>
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
                          showThumbs={false}
                        >
                          {product.url.map((url: string, index) => {
                            return (
                              <div key={index}>
                                <img
                                  src={url}
                                  alt={product.name}
                                  className="
                              w-full h-full object-cover    max-sm:object-contain"
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
                              w-full h-full  
                              object-contain
                              max-sm:object-contain"
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
    </>
  );
}

export default ProductList;
