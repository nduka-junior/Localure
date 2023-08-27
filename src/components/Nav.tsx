import Link  from "next/link";
import React from "react";
import AuthModal from "./AuthModal";

function Nav() {
  return (
    <div className="flex p-3 justify-between items-center border-b-2 ">
      <Link href="/">
        <h1 className="text-2xl">LocaLure</h1>
      </Link>
      <AuthModal />
    </div>
  );
}

export default Nav;
