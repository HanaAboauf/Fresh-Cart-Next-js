import React from "react";
import notFound from "../../public/images/404.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white  flex items-center justify-center">
      <Image src={notFound} alt="not-found image" className="not found image" />
    </div>
  );
}
