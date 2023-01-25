import React from "react";
import { useStore } from "@/app/page";
import { capitalize } from "@/lib/string";

export default function TextInput({ name }: { name: "first" | "last" }) {
  const [fieldValue, setField] = useStore((store) => store[name]);
  return (
    <div className="flex gap-2">
      <h3 className="font-semibold">{capitalize(name)}</h3>
      <input
        value={fieldValue}
        onChange={(e) => setField({ [name]: e.target.value })}
      />
    </div>
  );
}
