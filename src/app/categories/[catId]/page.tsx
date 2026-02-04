import React from "react";
import { BaseUrl } from "@/types/types";
import Image from "next/image";

export default async function page({ params }: { params: { catId: string } }) {
  const id = params.catId;
  let res;
  try {
    const req = await fetch(`${BaseUrl}/api/v1/categories/${id}`);
    res = await req.json();
  } catch (error) {
    console.log(error);
  }
  return (
    <div className=" p-6 items-center min-h-screen">
      <div className="w-1/4 flex flex-col justify-center items-center">
        {res.data && res.data.image && (
          <Image
            src={res.data.image }
            className="w-full"
            alt={res.data.name}
            width={300}
            height={300}
          />
        )}
      <p className="text-2xl text-green-600">{res.data.name}</p>
      </div>
    </div>
  );
}
