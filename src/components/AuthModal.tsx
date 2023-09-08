"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth, authContextType } from "./context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import BusinessSearch from "@/components/BusinessSearch";
import { bsContextType, useBs } from "./context/BusinessContext";
function AuthModal() {
  const { signInWithGoogle, user, logoutFromGoogle, loading } =
    useAuth() as authContextType;
  const [hideSearch, setHideSearch] = useState<boolean>(true)
  const { businessInfo } = useBs() as bsContextType;

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {user ? (
        <div className="flex items-center  gap-4">
          <BusinessSearch
            hideSearch={hideSearch}
            setHideSearch={setHideSearch}
          />
          {hideSearch ? null : (
            <>
              <Link
                href="/profile"
                className="text-lg max-sm:text-sm hover:text-[#0000008e] "
              >
                Profile
              </Link>
              <Avatar className="max-sm:w-[35px] max-sm:h-[35px] ">
                <AvatarImage src={businessInfo?.photoUrl ?? ""} />
                <AvatarFallback>
                  {user?.displayName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={() => logoutFromGoogle()}
                className="max-sm:text-xs"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      ) : (
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="pb-[100px]">
              <DialogHeader className="flex items-center gap-4 justify-center">
                <DialogTitle>Please Login</DialogTitle>
                <DialogDescription>
                  <Button variant="outline" onClick={() => signInWithGoogle()}>
                    <h1 className="text-lg max-sm:text-sm">Sign In with google</h1>
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default AuthModal;
