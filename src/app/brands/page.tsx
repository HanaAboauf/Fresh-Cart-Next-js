import { BaseUrl, Brand } from '@/types/types';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const metadata = {
  title: "Brands Page",
};

export default async function page() {

  let brands: Brand[] = [];
  try {
    const res = await fetch(`${BaseUrl}/api/v1/brands`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch brands");
    const result = await res.json();
    brands = result.brands || result.data || result;
    
  } catch (error) {
    console.error("🚀 ~ getAllBrands ~ error:", error)
    return null ;   
  }


  return <>
    <main className="container mx-auto my-10 min-h-screen">
      <h1 className="text-3xl font-semibold my-10 flex justify-center items-center text-green-600">All Brands</h1>
      <section> 
        {brands.length === 0 ? (
          <h2 className="flex justify-center items-center">No brands found</h2>
        ) : ( <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {brands.map((brand, index) => (
              <Link  key={index} href=""  className="">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={300}
                        height={200}
                        className="rounded-lg w-full h-[340px] object-center"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-center font-bold text-3xl text-green-600">
                    {brand.name}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>)

        }
          
      </section>
       
      </main>
  
  </>
}
