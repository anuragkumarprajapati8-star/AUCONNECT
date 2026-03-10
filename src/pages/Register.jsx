import { useState } from "react";
import { supabase } from "../lib/client";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);

  const handleRegister = async () => {
    const fileName = `${Date.now()}-${file.name}`;

    await supabase.storage.from("avatars").upload(fileName, file);

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    await supabase.from("users").insert([
      {
        username,
        password_hash: password,
        bio,
        photo_url: data.publicUrl,
      },
    ]);

    alert("Registered successfully");
  };

  return (
    <div className="flex flex-col gap-3 p-6">
      <input
        className="border p-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <textarea
        placeholder="Bio"
        className="border p-2"
        onChange={(e) => setBio(e.target.value)}
      />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={handleRegister}
        className="bg-pink-500 text-white p-2 rounded"
      >
        Register
      </button>
    </div>
  );
}
