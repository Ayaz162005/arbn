import React from "react";
import Body from "@/components/Body";
import Filternav from "./components/Filternav";

export default function Home() {
  return (
    <div>
      <Filternav />
      <Body />
    </div>
  );
}
export const revalidate = 0; // revalidate at most every hour
