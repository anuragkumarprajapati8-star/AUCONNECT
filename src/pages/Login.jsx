import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password_hash", password)
      .single();

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6">
      <input
        placeholder="Username"
        className="border p-2"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
