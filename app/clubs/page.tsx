import React from "react";
import Card from "../components/Card";

const Page = () => {
  return (
    <div>
      <div className="grid grid-cols-3">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Page;
