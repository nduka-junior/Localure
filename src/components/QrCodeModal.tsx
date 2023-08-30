import React, { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "qrcode";
import Image from "next/image";
import { Button } from "./ui/button";
interface QrCodeModalProps {
  productId: string;
}
function QrCodeModal({ productId }: QrCodeModalProps) {
  const [qrCodeUrl, setQRCodeUrl] = useState<string>("");
  // generate qrcode
  const generateQRCode = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(src, function (err, url) {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  };

  const handleGenerateQRCode = async (productId: string) => {
    try {
      const qrCodeUrl = await generateQRCode(productId);
      setQRCodeUrl(qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
  useEffect(() => {
    handleGenerateQRCode(productId);
  }, []);
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Image
            src={qrCodeUrl}
            alt={"dd"}
            width={60}
            height={60}
            className="rounded"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Are you sure absolutely sure?</DialogTitle> */}
            <DialogDescription className="flex items-center">
              {/* /products/${productId} */}
              <Image
                src={qrCodeUrl}
                alt="qrcode"
                height={100}
                width={100}
                className="h-[300px] w-[300px]
              "
              />

              <div>
                <a href={qrCodeUrl} download>
                  <Button variant="outline">Save QRCode</Button>
                </a>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QrCodeModal;
