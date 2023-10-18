// "use server";
// "use client";
import React, { useEffect, useState } from "react";
import BodyPart from "./BodyPart";
import { use } from "react";
import getCurrentUser from "@/app/libs/getCurrentUser";

import prisma from "../app/libs/prismadb";
import { useSearchParams } from "next/navigation";
import { getListing } from "@/app/actions/getListingCategory";
import GetParam from "@/app/actions/getParam";

// async function getData() {
//   const res = await fetch("http://localhost:3000/api/listings");
//   const lists = await res.json();
//   return lists;
// }

export default async function Body(params) {
  // const searchParams = useSearchParams();
  // const [lists, setLists] = useState([]);
  // const quotes = use(getData());
  // const lists = await getData();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getData(); // Assuming getData is an asynchronous function
  //       console.log(res);
  //       setLists(res);
  //     } catch (error) {
  //       // Handle any errors that may occur during data fetching
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  //   return () => {};
  // }, []);

  const currentUser = await getCurrentUser();
  const lists = await getListing();
  const user = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
  });
  // const param = GetParam();
  // console.log(param, "trutru");

  // const res = await fetch("http://api/getParam");

  // const answer = await res.json();
  // console.log(answer, "ioicvj");

  return (
    <div className="p-4 grid grid-cols-2 gap-8">
      {lists?.map((item) => (
        <BodyPart
          key={item.id}
          item={item}
          active={user?.favoriteIds.includes(item.id)}
        />
      ))}
    </div>
  );
}
