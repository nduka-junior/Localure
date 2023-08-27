import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth, authContextType } from "./context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Progress } from "@/components/ui/progress";
import { storage } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ProductModalSkeleton from "./ProductModalSkeleton";




const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  price: z.string().min(0, {
    message: "Price must be at least 2 characters.",
  }),
  categories: z.string().min(2, {
    message: "Categories must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

// Product modal component
function ProductModal() {
  const [files, setFiles] = useState<FileList | null>();
  const [percent, setPercent] = useState<number | null>(0);
  const [noFiles, setNoFiles] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { user, loading } = useAuth() as authContextType  ;
  const { toast } = useToast();
  const router = useRouter();
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFiles(event?.target?.files);
    setInputValue(event.target.value);
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      categories: "",
      description: "",
    },
  });
  // handle image upload
  const handleImageUpload = async (imageFile: File) => {
    //  storage ref
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    //  upload task events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent + 0.002);
        console.log(percent);
      },
      (error) => {
        //  toast.error(error.message);
        console.log(error);
      }
    );

    await uploadTask;

    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    // 👆 getDownloadURL returns a promise too, so...
    console.log(downloadURL);
    setPercent(null);
    return downloadURL;
  };

  // submit form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setUploading(true);
    setNoFiles(0);
    let url = [];
    console.log(files?.length);
    if (files != null) {
      for (const file of Array.from(files)) {
        setNoFiles((prev) => prev + 1);

        const durl = await handleImageUpload(file);
        url.push(durl);
        console.log(durl);
      }

      try {
        const collectRef = collection(db, `${user?.uid}`);
        const docRef = await addDoc(collectRef, {
          date: new Date().toISOString(),
          id: collectRef.id,
          uid: user?.uid,
          ...values,
          url,
        });
        form.reset();
        setFiles(null);
        setInputValue("");

        toast({
          description: "Product added successfully",
          title: "Success",
        });
        console.log("Document written with ID: ", docRef.id);
        setUploading(false);
        // window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.log("no file");
      return toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one image.",
      });
    }
  }
  if (loading) {
    return <div>Loading... pmodal</div>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>

        <DialogContent className="h-[90vh] overflow-y-scroll max-sm:w-[90vw] ">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl  ">
              Product Details
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 mt-2 max-sm:text-left   "
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Mocktails" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the name of your product. This is how your
                          product will be displayed to customers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="$20" {...field} />
                        </FormControl>
                        <FormDescription>
                          Specify the price of your product. Customers will see
                          this when considering a purchase.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Mocktails" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a category for your product. This helps
                          customers find your product more easily.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Choose a category for your product. This helps
                          customers find your product more easily.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Select Images</FormLabel>
                    <FormControl className=" file:cursor-pointer ">
                      <Input
                        type="file"
                        className="file:border-2 file:rounded-lg py-2 h-auto file:px-2  w-full"
                        multiple
                        onChange={handleChange}
                        value={inputValue}
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                      />
                    </FormControl>
                    <FormDescription>
                      <>
                        Upload images of your product. This is how customers
                        will be able to see your product.
                        {percent && (
                          <div>
                            <h5 className="text-sm">
                              Uploading photos {noFiles} / {files?.length}
                            </h5>
                            <div className="flex items-center justify-center">
                              <h1 className="mr-2 text-sm">
                                {Math.floor(percent)}%
                              </h1>
                              <Progress value={percent} className="mt-3" />
                            </div>
                          </div>
                        )}
                      </>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>

                  <Button type="submit" disabled={uploading} className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
   
    </Dialog>
  );
}

export default ProductModal;
