"use client";
import React from "react";
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


function AuthModal() {
  const { signInWithGoogle, user, logoutFromGoogle, loading } =
    useAuth() as authContextType;
  console.log(user?.photoURL);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      {user ? (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={ user?.photoURL ?? undefined } />
            <AvatarFallback>
              {user?.displayName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button onClick={() => logoutFromGoogle()}>Logout</Button>
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
                    <h1 className="text-lg">Sign In with google</h1>
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
