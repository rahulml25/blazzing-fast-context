import React from "react";
import DisplayContainer from "./DisplayContainer";
import FormContainer from "./FormContainer";

export default function ContentContainer() {
  return (
    <div className="p-4 border">
      <h2 className="text-2xl font-bold mb-4">ContentContainer</h2>
      <div className="space-y-7">
        <FormContainer />
        <DisplayContainer />
      </div>
    </div>
  );
};
