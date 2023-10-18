import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Login from "./Login";
import FinfishSignup from "./Finfishsignup";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MyModal({ isOpen, setIsOpen }: Props) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpen3, setIsOpen3] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { register, handleSubmit, watch, formState, setValue } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const emailv = watch("email");
  async function onSubmit(data: any) {
    try {
      const postData = {
        email: data.email, // Assuming 'data.email' contains the email address
      };
      setIsloading(true);
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(postData), // Stringify the JSON object
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const responseJson = await res.json();

      setEmail(data.email);
      console.log(email, "dssd");
      if (responseJson.answer == null) {
        setIsOpen2(true);
        setValue("email", "");
        setIsOpen(false);
      } else {
        setIsOpen3(true);
        setValue("email", "");
        setIsOpen(false);
      }

      setIsError(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsloading(false);
    }
  }

  const { errors } = formState;
  console.log(email, emailv);
  return (
    <>
      {email && (
        <Login
          isOpen={isOpen3}
          setIsOpen={setIsOpen3}
          setIsOpen2={setIsOpen}
          email={email}
        />
      )}
      {email && (
        <FinfishSignup
          isOpen={isOpen2}
          setIsOpen={setIsOpen2}
          email={email}
          setIsOpen2={setIsOpen}
        />
      )}
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
                  <button className="absolute" onClick={closeModal}>
                    X
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center pb-4 border-b-2"
                  >
                    Login or Signup
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className=" text-black text-2xl font-bold mt-8">
                      Welcome to Airbnb
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "invalid email address",
                        },
                      })}
                      placeholder="Email"
                      className={`w-full border-2 p-4 outline-none ${
                        errors.email ? "border-red-700 " : ""
                      }`}
                      onChange={() => setIsError(true)}
                    />
                    {errors.email && !isError && (
                      <p className="text-red-700">{errors.email.message}</p>
                    )}

                    <input
                      type="submit"
                      value={`${!isLoading ? "Continue" : "..."}`}
                      disabled={isLoading}
                      className="w-full py-4 bg-red-600 rounded-xl mt-8 text-white cursor-pointer"
                      onClick={() => setIsError(false)}
                    />
                  </form>

                  <div className="mt-4 text-center relative top-3 bg-white w-12 m-auto">
                    or
                  </div>
                  <hr />

                  <div className="mt-8">
                    <div className="flex text-center justify-center cursor-pointer border border-black rounded-2xl p-3 relative mb-4">
                      <Image
                        src="/images/google-icon.png"
                        alt="goggle icon"
                        width={20}
                        height={20}
                        className="absolute left-4 top-3"
                      />
                      <div className="font-bold"> Continue with Google</div>
                    </div>
                    <div className="flex text-center justify-center cursor-pointer border border-black rounded-2xl p-3 relative">
                      <Image
                        src="/images/github.png"
                        alt="github icon"
                        width={20}
                        height={20}
                        className="absolute left-4 top-3"
                      />
                      <div
                        className="font-bold"
                        onClick={() => signIn("github")}
                      >
                        Continue with Github
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
