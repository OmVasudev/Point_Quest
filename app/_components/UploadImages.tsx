"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
const UploadImages = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage src={publicId} alt="image" width={"300"} height={"100"} />
      )}
      <CldUploadWidget
        uploadPreset="cgwiy7po"
        onSuccess={({ event, info }) => {
          if (event === "success") {
            setPublicId(info?.public_id);
          }
        }}
      >
        {({ open }) => (
          <button className="rounded-lg bg-red-600 p-4" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadImages;
