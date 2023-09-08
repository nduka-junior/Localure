import Link  from "next/link";
import React from "react";
import AuthModal from "./AuthModal";
import { Search } from "lucide-react";
function Nav() {
  return (
    <div className="flex p-3 justify-between items-center border-b-2 relative ">
      <Link href="/">
        <h1 className="text-2xl">LocaLure</h1>
      </Link>

        <AuthModal />

    </div>
  );
}

export default Nav;
