import React from "react";
import Card from "../../components/Card";
import Club from "../../components/Club";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-white">
      <div className="grid grid-cols-3">
        <Card />
        <Card />
        <Card />
        <Club />
      </div>
    </div>
  );
};

export default Page;
