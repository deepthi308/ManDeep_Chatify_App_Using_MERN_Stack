import React from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function ChatPage() {
  const { signout } = useAuthStore();

  return (
    <div className="z-10">
      Chat Page
      <button onClick={signout}>Logout</button>
    </div>
  );
}
