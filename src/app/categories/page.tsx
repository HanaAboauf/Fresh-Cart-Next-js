import { BaseUrl, Category } from "@/types/types";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Categories Page",
};

export default async function Categories() {
  let categories: Category[] = [];

  try {
    const res = await fetch(`${BaseUrl}/api/v1/categories`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    const result = await res.json();

    categories = result.categories || result.data || result;
  } catch (error) {
    console.error("🚀 ~ getAllCategories ~ error:", error);
    return null;
  }

  return (
    <main className="container mx-auto my-10 min-h-screen">
      <h1 className="text-3xl font-semibold my-10 flex justify-center items-center">
        All Categories
      </h1>

      <section>
        {categories.length === 0 ? (
          <h2 className="flex justify-center items-center">
            No categories found
          </h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((category, index) => (
              <Link  key={index} href={`/categories/${category._id}`} className="">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={300}
                        height={200}
                        className="object-cover rounded-lg w-full h-[340px] object-center"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-center font-bold text-3xl text-green-600">
                    {category.name}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
