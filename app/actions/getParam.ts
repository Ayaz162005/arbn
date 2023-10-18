"use client";

import { useSearchParams } from "next/navigation";

export default function GetParam() {
  const param = useSearchParams();

  console.log(param, "sdsd");

  return Response.json({ id: "sdsd" });
}
