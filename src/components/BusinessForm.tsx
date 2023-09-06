"use client";

import React, { ChangeEvent, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth, authContextType } from "@/components/context/AuthContext";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { updateProfile } from "firebase/auth";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// zod schema
const formSchema = z.object({
  BusinessName: z.string().min(3, {
    message: "Business Name must be at least 3 characters.",
  }),
  location: z.string().min(10, {
    message: "Location must be at least 10 characters.",
  }),
  contact: z.string().min(4, {
    message: "Contact must be at least 4 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
});
const BusinessForm = () => {
  const { user, loading, error } = useAuth() as authContextType;
  const [file, setFile] = useState<FileList | null>();
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BusinessName: "shadcn",
      location: "new york city",
      contact: "+123456789",
    },
  });
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFile(event?.target?.files);
    setInputValue(event.target.value);
  }
  // handle image upload
  const handleImageUpload = async (imageFile: File) => {
    if (!file) return user?.photoURL;

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
        // setPercent(percent + 0.002);
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
    // setPercent(null);
    return downloadURL;
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (file) {
      const url = await handleImageUpload(file[0]);
      const docRef = doc(collection(db, "businessDetails"), user?.uid);
      await setDoc(docRef, {
        ...values,
        uid: user?.uid,
        date: new Date(),
        photoUrl: url,
      });
      // Update the photoURL for the currently signed-in user
      updateProfile(auth.currentUser!, { photoURL: url })
        .then(() => {
          // Profile updated successfully
          console.log("PhotoURL updated successfully!");
        })
        .catch((error) => {
          // An error occurred
          console.error("Error updating PhotoURL:", error);
        });
      console.log("Document written with ID: ", docRef.id);
      console.log(values);
      toast({
        title: "Account created.",
      });
      return router.push("/profile");
    }
  }

  const categories: { value: string; label: string }[] = [
    "Advertising Agencies",
    "Aerospace & Defense",
    "Agricultural Inputs",
    "Airlines",
    "Airports & Air Services",
    "Aluminum",
    "Apparel Manufacturing",
    "Apparel Retail",
    "Apparel Stores",
    "Asset Management",
    "Auto & Truck Dealerships",
    "Auto Manufacturers",
    "Auto Parts",
    "Banks - Diversified",
    "Banks - Global",
    "Banks - Regional",
    "Banks - Regional - US",
    "Beverages - Brewers",
    "Beverages - Non-Alcoholic",
    "Beverages - Soft Drinks",
    "Beverages - Wineries & Distilleries",
    "Biotechnology",
    "Broadcasting",
    "Broadcasting - Radio",
    "Broadcasting - TV",
    "Building Materials",
    "Building Products & Equipment",
    "Business Equipment",
    "Business Equipment & Supplies",
    "Business Services",
    "Capital Markets",
    "Chemicals",
    "Coal",
    "Coking Coal",
    "Communication Equipment",
    "Computer Hardware",
    "Computer Systems",
    "Confectioners",
    "Conglomerates",
    "Consulting Services",
    "Consumer Electronics",
    "Copper",
    "Credit Services",
    "Data Storage",
    "Department Stores",
    "Diagnostics & Research",
    "Discount Stores",
    "Diversified Industrials",
    "Drug Manufacturers - General",
    "Drug Manufacturers - Major",
    "Drug Manufacturers - Specialty & Generic",
    "Education & Training Services",
    "Electrical Equipment & Parts",
    "Electronic Components",
    "Electronic Gaming & Multimedia",
    "Electronics & Computer Distribution",
    "Engineering & Construction",
    "Entertainment",
    "Farm & Construction Equipment",
    "Farm & Heavy Construction Machinery",
    "Farm Products",
    "Financial Conglomerates",
    "Financial Data & Stock Exchanges",
    "Financial Exchanges",
    "Food Distribution",
    "Footwear & Accessories",
    "Furnishings",
    "Furnishings Fixtures & Appliances",
    "Gambling",
    "Gold",
    "Grocery Stores",
    "Health Care Plans",
    "Health Information Services",
    "Healthcare Plans",
    "Home Furnishings & Fixtures",
    "Home Improvement Retail",
    "Home Improvement Stores",
    "Household & Personal Products",
    "Industrial Distribution",
    "Industrial Metals & Minerals",
    "Information Technology Services",
    "Infrastructure Operations",
    "Insurance - Diversified",
    "Insurance - Life",
    "Insurance - Property & Casualty",
    "Insurance - Reinsurance",
    "Insurance - Specialty",
    "Insurance Brokers",
    "Integrated Freight & Logistics",
    "Internet Content & Information",
    "Internet Retail",
    "Leisure",
    "Lodging",
    "Long-Term Care Facilities",
    "Lumber & Wood Production",
    "Luxury Goods",
    "Marine Shipping",
    "Media - Diversified",
    "Medical Care",
    "Medical Care Facilities",
    "Medical Devices",
    "Medical Distribution",
    "Medical Instruments & Supplies",
    "Metal Fabrication",
    "Mortgage Finance",
    "Oil & Gas Drilling",
    "Oil & Gas E&P",
    "Oil & Gas Equipment & Services",
    "Oil & Gas Integrated",
    "Oil & Gas Midstream",
    "Oil & Gas Refining & Marketing",
    "Other Industrial Metals & Mining",
    "Other Precious Metals & Mining",
    "Packaged Foods",
    "Packaging & Containers",
    "Paper & Paper Products",
    "Personal Services",
    "Pharmaceutical Retailers",
    "Pollution & Treatment Controls",
    "Publishing",
    "REIT - Diversified",
    "REIT - Healthcare Facilities",
    "REIT - Hotel & Motel",
    "REIT - Industrial",
    "REIT - Mortgage",
    "REIT - Office",
    "REIT - Residential",
    "REIT - Retail",
    "REIT - Specialty",
    "Railroads",
    "Real Estate - Development",
    "Real Estate - Diversified",
    "Real Estate - General",
    "Real Estate Services",
    "Recreational Vehicles",
    "Rental & Leasing Services",
    "Residential Construction",
    "Resorts & Casinos",
    "Restaurants",
    "Savings & Cooperative Banks",
    "Scientific & Technical Instruments",
    "Security & Protection Services",
    "Semiconductor Equipment & Materials",
    "Semiconductor Memory",
    "Semiconductors",
    "Shell Companies",
    "Shipping & Ports",
    "Silver",
    "Software - Application",
    "Software - Infrastructure",
    "Solar",
    "Specialty Business Services",
    "Specialty Chemicals",
    "Specialty Finance",
    "Specialty Industrial Machinery",
    "Specialty Retail",
    "Staffing & Employment Services",
    "Staffing & Outsourcing Services",
    "Steel",
    "Telecom Services",
    "Textile Manufacturing",
    "Thermal Coal",
    "Tobacco",
    "Tools & Accessories",
    "Travel Services",
    "Trucking",
    "Uranium",
    "Utilities - Diversified",
    "Utilities - Independent Power Producers",
    "Utilities - Regulated Electric",
    "Utilities - Regulated Gas",
    "Utilities - Regulated Water",
    "Utilities - Renewable",
    "Waste Management",
  ].map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="container md:max-w-[60vw]">
      <h1 className="text-2xl text-center font-semibold">Business Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="BusinessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location </FormLabel>
                <FormControl>
                  <Input placeholder="new york" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Select Images</FormLabel>
            <FormControl className=" file:cursor-pointer ">
              <Input
                type="file"
                className="file:border-2 file:rounded-lg py-2 h-auto file:px-2  w-full"
                onChange={handleChange}
                value={inputValue}
                accept="image/jpeg,image/jpg,image/png,image/webp"
              />
            </FormControl>

            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.value === field.value
                            )?.label
                          : "Select category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full h-auto max-h-[40vh] overflow-y-auto p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup className="overflow-auto">
                        {categories.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value);
                            }}
                          >
                            {category.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact </FormLabel>
                <FormControl>
                  <Input placeholder="+123456789" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BusinessForm;
