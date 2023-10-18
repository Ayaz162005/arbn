import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Model({
  menuRef,
  handleClick,
}: {
  menuRef: React.RefObject<HTMLDivElement>;
  handleClick: () => void;
}) {
  const router = useRouter();
  return (
    <div
      ref={menuRef}
      className="absolute right-0 w-52  bg-white top-16 rounded-xl z-10"
    >
      <ul className="p-2">
        <li className="hover:bg-stone-100  w-full p-3 cursor-pointer transition-all ">
          Messages
        </li>
        <li className="hover:bg-stone-100 w-full p-3 cursor-pointer transition-all">
          Notifications
        </li>
        <li
          className="hover:bg-stone-100 w-full p-3 cursor-pointer transition-all"
          onClick={() => router.push("/trips")}
        >
          Trips
        </li>
        <li className="hover:bg-stone-100 w-full p-3 cursor-pointer transition-all">
          Wishlists
        </li>
        <li
          className="hover:bg-stone-100 w-full p-3 cursor-pointer transition-all font-bold"
          onClick={() => signOut()}
        >
          Log out
        </li>
      </ul>
    </div>
  );
}
