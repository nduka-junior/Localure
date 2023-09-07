"use client";
import { createContext, useContext, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState, AuthStateHook } from "react-firebase-hooks/auth";
import { useToast } from "@/components/ui/use-toast";
import { User } from "firebase/auth";



if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

export interface authContextType {
  user: User | null | undefined;
  loading: boolean;
  error: unknown;
  signInWithGoogle: () => void;
  logoutFromGoogle: () => void;
}

export const createAuthContext = createContext<authContextType | null>({

  user: null,
  loading: false,
  error: null,
  signInWithGoogle: () => {},
  logoutFromGoogle: () => {},
});

function AuthContext({ children }: { children: ReactNode }) {
  const [user, loading, error]: AuthStateHook = useAuthState(auth);
  const { toast } = useToast();

  // PROVIDER
  const googleProvider = new GoogleAuthProvider();
  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
    console.log("working");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token + "token");
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        toast({
          description: "Login Successful",
          title: `Welcome ${user?.displayName}`,
        });
      })
      .catch((error) => {
        console.log(error + "error");
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logoutFromGoogle = async () => {
    auth
      .signOut()
      .then(() => {
        toast({
          description: "Logout Successful",
        });
        // router.refresh()
      })
      .catch((error) => {
        toast({
          title: "Logout Unsuccessful",
          description: error,
        });
        // An error happened.
      });
  };

  const value: authContextType = {

    user,
    loading,
    error,
    signInWithGoogle,
    logoutFromGoogle,
  };

  return (
    <createAuthContext.Provider value={value}>
      {children}
    </createAuthContext.Provider>
  );
}

export default AuthContext;

export const useAuth = () => useContext<authContextType | null>(createAuthContext);
