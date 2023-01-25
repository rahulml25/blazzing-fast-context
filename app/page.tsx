"use client";

import "@/styles/tailwind.css";
import ContentContainer from "@/components/ContentContainer";
import createFastContext from "@/lib/createFastContext";

const { Provider, useStore } = createFastContext({
  first: "",
  last: "",
});

export { useStore };

export default function HomePage() {
  return (
    <Provider>
      <div className="max-w-xl mx-auto py-20 px-9 border mt-12">
        <h1 className="font-bold text-4xl mb-7">App</h1>
        <ContentContainer />
      </div>
    </Provider>
  );
}
