"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function HeartButton({
  item,
  active,
}: {
  item: {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    createdAt: Date;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string;
    userId: string;
    price: number;
  };
  active: boolean | undefined;
}) {
  const router = useRouter();
  async function handleClick(e) {
    e.stopPropagation();

    const data = await fetch("api/addfavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify({ id: item.id }), // Convert item.id to a JSON string
    });
    router.refresh();
  }
  async function handledelete(e) {
    e.stopPropagation();
    try {
      const data = await fetch("api/deletefavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id }),
      });

      if (data.status === 200) {
        // Successful response, handle it here

        router.refresh();
      } else {
        // Handle non-successful response (e.g., show an error message)
        console.error("Delete request failed.");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Fetch error:", error);
    }
  }
  //   export revalidate = 0
  return (
    <div>
      {!active ? (
        <AiOutlineHeart
          size={40}
          className="absolute right-8 top-4 hover:cursor-pointer text-red-600"
          onClick={(e) => handleClick(e)}
        />
      ) : (
        <AiFillHeart
          size={40}
          className="absolute right-8 top-4 hover:cursor-pointer text-red-600"
          onClick={(e) => handledelete(e)}
        />
      )}
    </div>
  );
}
