"use client";

import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        phoneNo: formData.get("phoneNo"),
        branch: formData.get("branch"),
        usn: formData.get("usn"),
        points: formData.get("points"),
        passingYear: formData.get("passingYear"),
      }),
    });
    console.log({ response });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="firstName"
        className="border border-black"
        type="text"
        placeholder="Om"
      />
      <input
        name="lastName"
        className="border border-black"
        type="text"
        placeholder="Vasudev"
      />
      <input
        name="email"
        className="border border-black"
        type="email"
        placeholder="omvasudev@gmail.com"
      />
      <input
        name="password"
        className="border border-black"
        type="password"
        placeholder="password"
      />
      <input
        name="phoneNo"
        className="border border-black"
        type="number"
        placeholder="1234567890"
      />
      <input
        name="branch"
        className="border border-black"
        type="text"
        placeholder="branch"
      />
      <input
        name="usn"
        className="border border-black"
        type="text"
        placeholder="2GI21CS099"
      />
      <input
        name="passingYear"
        className="border border-black"
        type="number"
        placeholder="passing year"
      />
      <button type="submit">Register</button>
    </form>
  );
}
