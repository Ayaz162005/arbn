import React from "react";

export default function Model({
  menuRef,
  handleClick,
}: {
  menuRef: React.RefObject<HTMLDivElement>;
  handleClick: () => void;
}) {
  return (
    <div
      ref={menuRef}
      className="absolute right-0 w-52  bg-white top-16 rounded-xl"
    >
      <ul className="p-2">
        <li
          className="hover:bg-stone-100  w-full p-3 cursor-pointer transition-all "
          onClick={handleClick}
        >
          Log in
        </li>
        <li
          className="hover:bg-stone-100 w-full p-3 cursor-pointer transition-all"
          onClick={handleClick}
        >
          Sign up
        </li>
      </ul>
    </div>
  );
}
