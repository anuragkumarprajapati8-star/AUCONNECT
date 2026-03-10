// // import React, { useState, useEffect } from "react";
// // import { supabase } from "../lib/supabase";
// // import { MessageCircle } from "lucide-react";
// // import toast from "react-hot-toast";

// // export default function Matches() {
// //   const [matches, setMatches] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadMatches();
// //   }, []);

// //   const loadMatches = async () => {
// //     try {
// //       const {
// //         data: { user },
// //       } = await supabase.auth.getUser();

// //       // Get users that liked me
// //       const { data: likesToMe, error: error1 } = await supabase
// //         .from("likes")
// //         .select("user_id")
// //         .eq("liked_user_id", user.id);

// //       if (error1) throw error1;

// //       // Get users I liked
// //       const { data: likesFromMe, error: error2 } = await supabase
// //         .from("likes")
// //         .select("liked_user_id")
// //         .eq("user_id", user.id);

// //       if (error2) throw error2;

// //       // Find matches (mutual likes)
// //       const likedUserIds = likesFromMe.map((l) => l.liked_user_id);
// //       const matches = likesToMe
// //         .filter((like) => likedUserIds.includes(like.user_id))
// //         .map((like) => like.user_id);

// //       // Get match profiles
// //       if (matches.length > 0) {
// //         const { data: profiles, error } = await supabase
// //           .from("profiles")
// //           .select("*")
// //           .in("id", matches);

// //         if (error) throw error;
// //         setMatches(profiles);
// //       }
// //     } catch (error) {
// //       console.error("Error loading matches:", error);
// //       toast.error("Failed to load matches");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-[80vh] flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto p-6">
// //       <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Matches</h2>

// //       {matches.length === 0 ? (
// //         <div className="text-center py-12">
// //           <MessageCircle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
// //           <h3 className="text-xl font-semibold text-gray-700 mb-2">
// //             No matches yet
// //           </h3>
// //           <p className="text-gray-500">
// //             Keep swiping to find your perfect match!
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {matches.map((match) => (
// //             <div
// //               key={match.id}
// //               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
// //             >
// //               <img
// //                 src={match.photos?.[0] || "https://via.placeholder.com/300"}
// //                 alt={match.username}
// //                 className="w-full h-48 object-cover"
// //               />
// //               <div className="p-4">
// //                 <h3 className="text-xl font-semibold text-gray-800">
// //                   {match.username}, {match.age}
// //                 </h3>
// //                 <button className="mt-3 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
// //                   Send Message
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabase";
// import { MessageCircle, Heart } from "lucide-react";
// import Chat from "./Chat";
// import toast from "react-hot-toast";

// export default function Matches() {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMatch, setSelectedMatch] = useState(null);
//   const [unreadCounts, setUnreadCounts] = useState({});

//   useEffect(() => {
//     loadMatches();
//     subscribeToNewMessages();
//   }, []);

//   const loadMatches = async () => {
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       // Get users that liked me
//       const { data: likesToMe, error: error1 } = await supabase
//         .from("likes")
//         .select("user_id")
//         .eq("liked_user_id", user.id);

//       if (error1) throw error1;

//       // Get users I liked
//       const { data: likesFromMe, error: error2 } = await supabase
//         .from("likes")
//         .select("liked_user_id")
//         .eq("user_id", user.id);

//       if (error2) throw error2;

//       // Find matches (mutual likes)
//       const likedUserIds = likesFromMe.map((l) => l.liked_user_id);
//       const matchIds = (likesToMe || [])
//         .filter((like) => likedUserIds.includes(like.user_id))
//         .map((like) => like.user_id);

//       // Get match profiles
//       if (matchIds.length > 0) {
//         const { data: profiles, error } = await supabase
//           .from("profiles")
//           .select("*")
//           .in("id", matchIds);

//         if (error) throw error;
//         setMatches(profiles || []);

//         // Load unread counts
//         await loadUnreadCounts(profiles || [], user.id);
//       } else {
//         setMatches([]);
//       }
//     } catch (error) {
//       console.error("Error loading matches:", error);
//       toast.error("Failed to load matches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadUnreadCounts = async (profiles, currentUserId) => {
//     const counts = {};

//     for (const match of profiles) {
//       const { count, error } = await supabase
//         .from("messages")
//         .select("*", { count: "exact", head: true })
//         .eq("sender_id", match.id)
//         .eq("receiver_id", currentUserId)
//         .eq("read", false);

//       if (!error) {
//         counts[match.id] = count;
//       }
//     }

//     setUnreadCounts(counts);
//   };

//   const subscribeToNewMessages = () => {
//     const subscription = supabase
//       .channel("matches")
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

//           // If message is for current user
//           if (payload.new.receiver_id === user.id) {
//             // Update unread count for that match
//             setUnreadCounts((prev) => ({
//               ...prev,
//               [payload.new.sender_id]: (prev[payload.new.sender_id] || 0) + 1,
//             }));

//             // Show notification
//             toast.custom((t) => (
//               <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
//                 <p className="font-semibold">New message from a match!</p>
//               </div>
//             ));
//           }
//         },
//       )
//       .subscribe();

//     return () => {
//       subscription.unsubscribe();
//     };
//   };

//   if (selectedMatch) {
//     return (
//       <div className="h-[calc(100vh-64px)]">
//         <Chat match={selectedMatch} onBack={() => setSelectedMatch(null)} />
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-800">Your Matches</h2>
//         <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full">
//           <Heart className="w-5 h-5 inline mr-1" />
//           <span>
//             {matches.length} {matches.length === 1 ? "Match" : "Matches"}
//           </span>
//         </div>
//       </div>

//       {matches.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
//           <MessageCircle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             No matches yet
//           </h3>
//           <p className="text-gray-500">
//             Keep swiping to find your perfect match!
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {matches.map((match) => (
//             <div
//               key={match.id}
//               onClick={() => setSelectedMatch(match)}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer transform hover:-translate-y-1"
//             >
//               <div className="relative">
//                 <img
//                   src={match.photos?.[0] || "https://via.placeholder.com/300"}
//                   alt={match.username}
//                   className="w-full h-48 object-cover"
//                 />
//                 {unreadCounts[match.id] > 0 && (
//                   <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
//                     {unreadCounts[match.id]}
//                   </div>
//                 )}
//               </div>
//               <div className="p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {match.username}, {match.age}
//                   </h3>
//                   <span className="text-green-500 text-sm">● Online</span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {(match.interests || [])
//                     .slice(0, 3)
//                     .map((interest, index) => (
//                       <span
//                         key={index}
//                         className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-xs"
//                       >
//                         {interest}
//                       </span>
//                     ))}
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedMatch(match);
//                   }}
//                   className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition flex items-center justify-center space-x-2"
//                 >
//                   <MessageCircle className="w-4 h-4" />
//                   <span>Send Message</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { MessageCircle, Heart } from "lucide-react";
import Chat from "./Chat";
import toast from "react-hot-toast";

export default function Matches() {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (user) {
      loadMatches();
      subscribeToNewMessages();
    }
  }, [user]);

  const loadMatches = async () => {
    try {
      const { data: likesToMe, error: error1 } = await supabase
        .from("likes")
        .select("user_id")
        .eq("liked_user_id", user.id);

      if (error1) throw error1;

      const { data: likesFromMe, error: error2 } = await supabase
        .from("likes")
        .select("liked_user_id")
        .eq("user_id", user.id);

      if (error2) throw error2;

      const likedUserIds = likesFromMe.map((l) => l.liked_user_id);
      const matchIds = (likesToMe || [])
        .filter((like) => likedUserIds.includes(like.user_id))
        .map((like) => like.user_id);

      if (matchIds.length > 0) {
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("*")
          .in("id", matchIds);

        if (error) throw error;
        setMatches(profiles || []);

        await loadUnreadCounts(profiles || [], user.id);
      } else {
        setMatches([]);
      }
    } catch (error) {
      console.error("Error loading matches:", error);
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCounts = async (profiles, currentUserId) => {
    const counts = {};

    for (const match of profiles) {
      const { count, error } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("sender_id", match.id)
        .eq("receiver_id", currentUserId)
        .eq("read", false);

      if (!error) {
        counts[match.id] = count;
      }
    }

    setUnreadCounts(counts);
  };

  const subscribeToNewMessages = () => {
    const subscription = supabase
      .channel("matches")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          if (payload.new.receiver_id === user.id) {
            setUnreadCounts((prev) => ({
              ...prev,
              [payload.new.sender_id]: (prev[payload.new.sender_id] || 0) + 1,
            }));

            toast.custom((t) => (
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
                <p className="font-semibold">New message from a match!</p>
              </div>
            ));
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  if (selectedMatch) {
    return (
      <div className="h-[calc(100vh-64px)]">
        <Chat match={selectedMatch} onBack={() => setSelectedMatch(null)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Matches</h2>
        <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full">
          <Heart className="w-5 h-5 inline mr-1" />
          <span>
            {matches.length} {matches.length === 1 ? "Match" : "Matches"}
          </span>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <MessageCircle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No matches yet
          </h3>
          <p className="text-gray-500">
            Keep swiping to find your perfect match!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={match.photos?.[0] || "https://via.placeholder.com/300"}
                  alt={match.username}
                  className="w-full h-48 object-cover"
                />
                {unreadCounts[match.id] > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {unreadCounts[match.id]}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {match.username}, {match.age}
                  </h3>
                  <span className="text-green-500 text-sm">● Online</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(match.interests || [])
                    .slice(0, 3)
                    .map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMatch(match);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
