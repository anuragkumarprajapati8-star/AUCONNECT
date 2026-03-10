// import React, { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import { MessageCircle } from "lucide-react";
// import toast from "react-hot-toast";

// export default function MessageNotification() {
//   useEffect(() => {
//     const subscription = supabase
//       .channel("message-notifications")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "messages",
//         },
//         async (payload) => {
//           const {
//             data: { user },
//           } = await supabase.auth.getUser();

//           // Only show notification if message is for current user
//           if (payload.new.receiver_id === user?.id) {
//             // Get sender info
//             const { data: sender } = await supabase
//               .from("profiles")
//               .select("username, photos")
//               .eq("id", payload.new.sender_id)
//               .single();

//             toast.custom(
//               (t) => (
//                 <div
//                   className={`${
//                     t.visible ? "animate-enter" : "animate-leave"
//                   } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//                 >
//                   <div className="flex-1 w-0 p-4">
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 pt-0.5">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={
//                             sender?.photos?.[0] ||
//                             "https://via.placeholder.com/40"
//                           }
//                           alt=""
//                         />
//                       </div>
//                       <div className="ml-3 flex-1">
//                         <p className="text-sm font-medium text-gray-900">
//                           {sender?.username}
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {payload.new.content.substring(0, 50)}
//                           {payload.new.content.length > 50 ? "..." : ""}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex border-l border-gray-200">
//                     <button
//                       onClick={() => toast.dismiss(t.id)}
//                       className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               ),
//               {
//                 duration: 4000,
//                 position: "top-right",
//               },
//             );
//           }
//         },
//       )
//       .subscribe();

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   return null; // This component doesn't render anything
// }

import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function MessageNotification() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel("message-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          if (payload.new.receiver_id === user.id) {
            const { data: sender } = await supabase
              .from("profiles")
              .select("username, photos")
              .eq("id", payload.new.sender_id)
              .single();

            toast.custom(
              (t) => (
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            sender?.photos?.[0] ||
                            "https://via.placeholder.com/40"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {sender?.username}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {payload.new.content.substring(0, 50)}
                          {payload.new.content.length > 50 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ),
              {
                duration: 4000,
                position: "top-right",
              },
            );
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return null;
}
