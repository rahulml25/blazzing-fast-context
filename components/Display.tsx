import React from "react";
import { useStore } from "@/app/page";
import { capitalize } from "@/lib/string";

export default function Display({ name }: { name: "first" | "last" }) {
  const [fieldValue] = useStore((store) => store[name]);
  return (
    <div className="flex gap-2">
      <p className="font-semibold">{capitalize(name)}</p>: <p>{fieldValue}</p>
    </div>
  );
}
