import React from "react";
import Display from "./Display";

export default function DisplayContainer() {
  return (
    <div className="p-2 border">
      <h3 className="text-xl font-bold mb-4">Display</h3>
      <div>
        <Display name="first" />
        <Display name="last" />
      </div>
    </div>
  );
}
