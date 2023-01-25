import React from "react";
import { useStore } from "@/app/page";
import { capitalize } from "@/utils/string";

export default function TextInput({ name }: { name: "first" | "last" }) {
  const [store, setStore] = useStore();
  return (
    <div className="flex gap-2">
      <h3 className="font-semibold">{capitalize(name)}</h3>
      <input
        value={store[name]}
        onChange={(e) => setStore({ ...store, [name]: e.target.value })}
      />
    </div>
  );
}
