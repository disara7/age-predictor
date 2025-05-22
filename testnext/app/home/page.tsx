"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Home() {
  const [inputVal, setInputVal] = useState("");

  const {push} = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    push(`/prediction/${inputVal}`);
  }

  return (
    <div>
      <div>
      <div className="bg-[var(--background)] text-[var(--foreground)]">
  <h1 className="text-3xl font-bold">Welcome to My App</h1>
</div>

        <h1>enter your name</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="type your name"
        value={inputVal} 
        onChange={(e) => setInputVal(e.target.value)}/>
        <button type="submit">Predict data</button>
      </form>
    </div>
  );
}
