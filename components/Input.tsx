import React from "react";
type Props = {
  register: any;
  errors: any;
  setIsError: (value: boolean) => void;
  isError: boolean;
  value: string;
  className: string;
  placeholder: string;
  speciality: {};
  disabled?: string;
};
export default function Input({
  register,
  errors,
  setIsError,
  isError,
  value,
  className,
  placeholder,
  speciality,
  disabled = "false",
}: Props) {
  return (
    <>
      <input
        {...register(`${value}`, speciality)}
        placeholder={`${placeholder}`}
        className={`w-full border-2 p-4 outline-none ${className} ${
          errors[`${value}`] ? "border-red-700 " : ""
        }`}
        onChange={() => setIsError(true)}
        disabled={disabled === "true"}
      />

      {errors[`${value}`] && !isError && (
        <p className="text-red-700">{errors[`${value}`].message}</p>
      )}
    </>
  );
}
