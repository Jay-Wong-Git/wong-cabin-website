"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.website}</li>
        ))}
      </ul>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </>
  );
}
