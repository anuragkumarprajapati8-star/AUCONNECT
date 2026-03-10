// import { useEffect, useState } from "react";
// import { supabase } from "../supabase/client";
// import ProfileCard from "../components/ProfileCard";

// export default function Home() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const { data } = await supabase.from("users").select("*");

//       setUsers(data);
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="flex justify-center mt-10">
//       {users.map((user) => (
//         <ProfileCard key={user.id} user={user} />
//       ))}
//     </div>
//   );
// }

import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Rest of your swipe UI */}
    </div>
  );
}
