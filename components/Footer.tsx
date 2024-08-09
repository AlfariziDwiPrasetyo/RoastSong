import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="mt-12 flex items-center text-center justify-center p-3">
      <p className="text-center tracking-tight">
        Made by{" "}
        <Link
          href={"https://github.com/AlfariziDwiPrasetyo"}
          className="font-bold"
        >
          ALDP
        </Link>
      </p>
    </div>
  );
}

export default Footer;
