// import React, { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'
// import { Heart, X, Star } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function SwipeCards() {
//   const [profiles, setProfiles] = useState([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     loadProfiles()
//   }, [])

//   const loadProfiles = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser()

//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .neq('id', user.id)
//         .not('photos', 'eq', '[]')

//       if (error) throw error
//       setProfiles(data || [])
//     } catch (error) {
//       console.error('Error loading profiles:', error)
//       toast.error('Failed to load profiles')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSwipe = async (direction, profileId) => {
//     if (direction === 'right') {
//       try {
//         const { data: { user } } = await supabase.auth.getUser()

//         const { error } = await supabase
//           .from('likes')
//           .insert({
//             user_id: user.id,
//             liked_user_id: profileId
//           })

//         if (error) throw error

//         // Check for match
//         const { data: match } = await supabase
//           .from('likes')
//           .select('*')
//           .eq('user_id', profileId)
//           .eq('liked_user_id', user.id)
//           .single()

//         if (match) {
//           toast.success("It's a match! 🎉")
//         }
//       } catch (error) {
//         console.error('Error liking profile:', error)
//       }
//     }

//     // Move to next profile
//     setCurrentIndex(currentIndex + 1)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//       </div>
//     )
//   }

//   if (currentIndex >= profiles.length) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="text-center">
//           <Star className="w-16 h-16 text-pink-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">No more profiles</h2>
//           <p className="text-gray-600">Check back later for new people!</p>
//         </div>
//       </div>
//     )
//   }

//   const currentProfile = profiles[currentIndex]

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center p-4">
//       <div className="relative w-full max-w-md">
//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           {/* Photos */}
//           <div className="relative h-96">
//             <img
//               src={currentProfile.photos?.[0] || 'https://via.placeholder.com/400'}
//               alt={currentProfile.username}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
//               <h2 className="text-3xl font-bold text-white">
//                 {currentProfile.username}, {currentProfile.age}
//               </h2>
//             </div>
//           </div>

//           {/* Bio */}
//           <div className="p-6">
//             <p className="text-gray-700 mb-4">{currentProfile.bio}</p>

//             {/* Interests */}
//             <div className="flex flex-wrap gap-2 mb-6">
//               {currentProfile.interests?.map((interest, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
//                 >
//                   {interest}
//                 </span>
//               ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => handleSwipe('left', currentProfile.id)}
//                 className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition"
//               >
//                 <X className="w-8 h-8 text-red-500" />
//               </button>
//               <button
//                 onClick={() => handleSwipe('right', currentProfile.id)}
//                 className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition"
//               >
//                 <Heart className="w-8 h-8 text-green-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Heart, X, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function SwipeCards() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfiles();
    }
  }, [user]);

  const loadProfiles = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id);

      if (error) throw error;

      const profilesWithPhotos = (data || []).filter(
        (profile) =>
          profile.photos &&
          Array.isArray(profile.photos) &&
          profile.photos.length > 0,
      );

      setProfiles(profilesWithPhotos);

      if (profilesWithPhotos.length === 0) {
        toast("No profiles with photos found. Add your photo first!", {
          icon: "📸",
        });
      }
    } catch (error) {
      console.error("Error loading profiles:", error);
      toast.error("Failed to load profiles: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction, profileId) => {
    if (direction === "right") {
      try {
        const { error } = await supabase.from("likes").insert({
          user_id: user.id,
          liked_user_id: profileId,
        });

        if (error) throw error;

        const { data: match } = await supabase
          .from("likes")
          .select("*")
          .eq("user_id", profileId)
          .eq("liked_user_id", user.id)
          .single();

        if (match) {
          toast.success("It's a match! 🎉");
        }
      } catch (error) {
        console.error("Error liking profile:", error);
      }
    }

    setCurrentIndex(currentIndex + 1);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <Star className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No more profiles
          </h2>
          <p className="text-gray-600">Check back later for new people!</p>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={
                currentProfile.photos?.[0] || "https://via.placeholder.com/400"
              }
              alt={currentProfile.username}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h2 className="text-3xl font-bold text-white">
                {currentProfile.username}, {currentProfile.age}
              </h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-4">{currentProfile.bio}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentProfile.interests?.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSwipe("left", currentProfile.id)}
                className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition"
              >
                <X className="w-8 h-8 text-red-500" />
              </button>
              <button
                onClick={() => handleSwipe("right", currentProfile.id)}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition"
              >
                <Heart className="w-8 h-8 text-green-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
