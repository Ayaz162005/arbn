import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import Input from "./Input";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setIsOpen2: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MyModal({
  isOpen,
  setIsOpen,
  email,
  setIsOpen2,
}: Props) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { register, handleSubmit, watch, formState, setValue } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });
  useEffect(
    function () {
      setValue("email", email);
    },
    [email, setValue]
  );

  async function onSubmit(data: any) {
    try {
      setIsloading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Stringify the JSON object
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      setValue("firstname", "");
      setValue("lastname", "");
      setValue("password", "");
      setValue("email", "");
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  }
  function handleClose() {
    setIsOpen2(true);
    setIsOpen(false);
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("password", "");
    setValue("email", "");
    setIsError(false);
  }
  const { errors } = formState;
  return (
    <>
      <div className="fixed  flex items-center justify-center"></div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button className="absolute" onClick={handleClose}>
                    <IoIosArrowBack />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center pb-4 border-b-2"
                  >
                    Finish signing up
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      register={register}
                      errors={errors}
                      setIsError={setIsError}
                      isError={isError}
                      value="firstname"
                      className={"mb-4 mt-2"}
                      placeholder="FirstName"
                      speciality={{
                        required: {
                          value: true,
                          message: "FirstName is required",
                        },
                        minLength: {
                          value: 3,
                          message: "FirstName must be  much 3 characters",
                        },
                      }}
                    />
                    <Input
                      register={register}
                      errors={errors}
                      setIsError={setIsError}
                      isError={isError}
                      value="lastname"
                      className={"mb-4 mt-2"}
                      placeholder="LastName"
                      speciality={{
                        required: {
                          value: true,
                          message: "LastName is required",
                        },
                        minLength: {
                          value: 3,
                          message: "LastName must be  much 3 characters",
                        },
                      }}
                    />
                    <Input
                      register={register}
                      errors={errors}
                      setIsError={setIsError}
                      isError={isError}
                      value="email"
                      className={"mb-4 mt-2"}
                      placeholder="Email"
                      speciality={{
                        required: {
                          value: true,
                          message: "FirstName is required",
                        },
                        minLength: {
                          value: 3,
                          message: "FirstName must be  much 3 characters",
                        },
                      }}
                      disabled="true"
                    />
                    <Input
                      register={register}
                      errors={errors}
                      setIsError={setIsError}
                      isError={isError}
                      value="password"
                      className={"mb-4 mt-2"}
                      placeholder="Password"
                      speciality={{
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be  much 8 characters",
                        },
                      }}
                    />
                    <input
                      type="submit"
                      value={`${!isLoading ? "Agree and continue" : "..."}`}
                      disabled={isLoading}
                      className="w-full py-4 bg-red-600 rounded-xl mt-8 text-white cursor-pointer"
                      onClick={() => setIsError(false)}
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
