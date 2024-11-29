"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      usn: formData.get("usn"),
      password: formData.get("password"),
      redirect: true,
    });

    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="usn"
        className="border border-black"
        type="text"
        placeholder="2GI21CS099"
      />
      <input
        name="password"
        className="border border-black"
        type="password"
        placeholder="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
