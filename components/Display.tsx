import React from "react";
import { useStore } from "@/app/page";
import { capitalize } from "@/utils/string";

export default function Display({ name }: { name: "first" | "last" }) {
  const [store] = useStore();
  return (
    <div className="flex gap-2">
      <p className="font-semibold">{capitalize(name)}</p>: <p>{store[name]}</p>
    </div>
  );
}
