import React from "react";
import TextInput from "./TextInput";

export default function FormContainer() {
  return (
    <div className="p-2 border">
      <h2 className="text-2xl font-bold mb-4">FormContainer</h2>
      <div className="flex space-x-3">
        <TextInput name="first" />
        <TextInput name="last" />
      </div>
    </div>
  );
};
