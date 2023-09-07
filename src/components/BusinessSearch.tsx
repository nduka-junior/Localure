import React, { useEffect, useState } from "react";
import { Divide, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { BusinessInfoType } from "@/components/context/BusinessContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
function BusinessSearch({
  hideSearch,
  setHideSearch,
}: {
  hideSearch: boolean;
  setHideSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<BusinessInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getSearch = async (value: string) => {
    setLoading(true);
    const productsRef = collection(db, "businessDetails");

    // Create a query to search for products with a specific condition (e.g., product name contains the keyword)
    // const q = query(productsRef, where("BusinessName", ">=", value));
    const q = query(
      productsRef,
      where("BusinessName", ">=", search),
      where("BusinessName", "<=", search + "\uf8ff"),
      orderBy("BusinessName")
    );

    try {
      const querySnapshot = await getDocs(q);

      // Iterate through the documents in the query result
      const results = querySnapshot.docs.map((doc) => {
        const data = doc.data() as BusinessInfoType;
        return data;
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for products: ", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (search.length > 0) {
      getSearch(search);
    } else {
      setSearchResults([]);
      setSearch("");
    }
  }, [search]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setHideSearch(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hideSearch]);

  useEffect(() => {
    setHideSearch(false);
  }, []);
  return (
    <div>
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Search size="23px" className=" cursor-pointer " />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Search for a business
              </DialogTitle>
              <DialogDescription>
                <Input
                  type="text"
                  id="email"
                  placeholder="Search"
                  autoComplete="off"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {searchResults && !loading ? (
                searchResults.map((item, index:number) => {
                  return (
                    <Link
                      key={index}
                      href={`/profile/${item.id}`}
                      onClick={() => {
                        // setSearch("");
                        setOpen(false);
                      }}
                    >
                      <div className=" ">
                        {
                          <div className="leading-[1px] flex items-center gap-2">
                            <div>
                              <Image
                                src={item.photoUrl}
                                className="rounded-full w-[40px] h-[40px]"
                                width={40}
                                height={40}
                                alt="avatar"
                              />
                            </div>
                            <div>
                              <div className="text-xl">{item.BusinessName}</div>
                              <div className="text-sm"> {item.category}</div>
                            </div>
                          </div>
                        }
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div>loading...</div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}

export default BusinessSearch;
