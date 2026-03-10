// // // // import React, { useState, useEffect } from "react";
// // // // import { supabase } from "../lib/supabase";
// // // // import { Camera, Upload, X } from "lucide-react";
// // // // import toast from "react-hot-toast";

// // // // export default function Profile() {
// // // //   const [user, setUser] = useState(null);
// // // //   const [profile, setProfile] = useState({
// // // //     username: "",
// // // //     bio: "",
// // // //     age: "",
// // // //     gender: "",
// // // //     interests: [],
// // // //     photos: [],
// // // //   });
// // // //   const [uploading, setUploading] = useState(false);

// // // //   useEffect(() => {
// // // //     getUser();
// // // //     getProfile();
// // // //   }, []);

// // // //   const getUser = async () => {
// // // //     const {
// // // //       data: { user },
// // // //     } = await supabase.auth.getUser();
// // // //     setUser(user);
// // // //   };

// // // //   const getProfile = async () => {
// // // //     try {
// // // //       const {
// // // //         data: { user },
// // // //       } = await supabase.auth.getUser();
// // // //       if (!user) return;

// // // //       const { data, error } = await supabase
// // // //         .from("profiles")
// // // //         .select("*")
// // // //         .eq("id", user.id)
// // // //         .single();

// // // //       if (error && error.code !== "PGRST116") throw error;

// // // //       if (data) {
// // // //         setProfile({
// // // //           username: data.username || "",
// // // //           bio: data.bio || "",
// // // //           age: data.age || "",
// // // //           gender: data.gender || "",
// // // //           interests: data.interests || [],
// // // //           photos: data.photos || [],
// // // //         });
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error loading profile:", error);
// // // //     }
// // // //   };

// // // //   const uploadPhoto = async (event) => {
// // // //     try {
// // // //       setUploading(true);
// // // //       const file = event.target.files[0];
// // // //       if (!file) return;

// // // //       const fileExt = file.name.split(".").pop();
// // // //       const fileName = `${user.id}/${Math.random()}.${fileExt}`;
// // // //       const filePath = fileName;

// // // //       const { error: uploadError } = await supabase.storage
// // // //         .from("photos")
// // // //         .upload(filePath, file);

// // // //       if (uploadError) throw uploadError;

// // // //       const {
// // // //         data: { publicUrl },
// // // //       } = supabase.storage.from("photos").getPublicUrl(filePath);

// // // //       const updatedPhotos = [...profile.photos, publicUrl];

// // // //       const { error: updateError } = await supabase.from("profiles").upsert({
// // // //         id: user.id,
// // // //         photos: updatedPhotos,
// // // //         updated_at: new Date(),
// // // //       });

// // // //       if (updateError) throw updateError;

// // // //       setProfile({ ...profile, photos: updatedPhotos });
// // // //       toast.success("Photo uploaded successfully!");
// // // //     } catch (error) {
// // // //       toast.error("Error uploading photo: " + error.message);
// // // //     } finally {
// // // //       setUploading(false);
// // // //     }
// // // //   };

// // // //   const removePhoto = async (photoUrl) => {
// // // //     try {
// // // //       const updatedPhotos = profile.photos.filter((url) => url !== photoUrl);

// // // //       const { error } = await supabase.from("profiles").upsert({
// // // //         id: user.id,
// // // //         photos: updatedPhotos,
// // // //         updated_at: new Date(),
// // // //       });

// // // //       if (error) throw error;

// // // //       setProfile({ ...profile, photos: updatedPhotos });
// // // //       toast.success("Photo removed");
// // // //     } catch (error) {
// // // //       toast.error("Error removing photo: " + error.message);
// // // //     }
// // // //   };

// // // //   const updateProfile = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const { error } = await supabase.from("profiles").upsert({
// // // //         id: user.id,
// // // //         ...profile,
// // // //         updated_at: new Date(),
// // // //       });

// // // //       if (error) throw error;
// // // //       toast.success("Profile updated successfully!");
// // // //     } catch (error) {
// // // //       toast.error("Error updating profile: " + error.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="max-w-4xl mx-auto p-6">
// // // //       <div className="bg-white rounded-2xl shadow-xl p-8">
// // // //         <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

// // // //         {/* Photos Section */}
// // // //         <div className="mb-8">
// // // //           <h3 className="text-lg font-semibold text-gray-700 mb-4">
// // // //             Your Photos
// // // //           </h3>
// // // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // // //             {profile.photos.map((photo, index) => (
// // // //               <div key={index} className="relative group">
// // // //                 <img
// // // //                   src={photo}
// // // //                   alt={`Profile ${index + 1}`}
// // // //                   className="w-full h-40 object-cover rounded-lg"
// // // //                 />
// // // //                 <button
// // // //                   onClick={() => removePhoto(photo)}
// // // //                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
// // // //                 >
// // // //                   <X className="w-4 h-4" />
// // // //                 </button>
// // // //               </div>
// // // //             ))}

// // // //             {profile.photos.length < 6 && (
// // // //               <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition">
// // // //                 <Camera className="w-8 h-8 text-gray-400" />
// // // //                 <span className="text-sm text-gray-500 mt-2">
// // // //                   {uploading ? "Uploading..." : "Add Photo"}
// // // //                 </span>
// // // //                 <input
// // // //                   type="file"
// // // //                   accept="image/*"
// // // //                   onChange={uploadPhoto}
// // // //                   disabled={uploading}
// // // //                   className="hidden"
// // // //                 />
// // // //               </label>
// // // //             )}
// // // //           </div>
// // // //           <p className="text-sm text-gray-500 mt-2">Add up to 6 photos</p>
// // // //         </div>

// // // //         {/* Profile Info Form */}
// // // //         <form onSubmit={updateProfile} className="space-y-6">
// // // //           <div className="grid md:grid-cols-2 gap-6">
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Username
// // // //               </label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={profile.username}
// // // //                 onChange={(e) =>
// // // //                   setProfile({ ...profile, username: e.target.value })
// // // //                 }
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //               />
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Age
// // // //               </label>
// // // //               <input
// // // //                 type="number"
// // // //                 value={profile.age}
// // // //                 onChange={(e) =>
// // // //                   setProfile({ ...profile, age: e.target.value })
// // // //                 }
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //               />
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Gender
// // // //               </label>
// // // //               <select
// // // //                 value={profile.gender}
// // // //                 onChange={(e) =>
// // // //                   setProfile({ ...profile, gender: e.target.value })
// // // //                 }
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //               >
// // // //                 <option value="">Select gender</option>
// // // //                 <option value="male">Male</option>
// // // //                 <option value="female">Female</option>
// // // //                 <option value="other">Other</option>
// // // //               </select>
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Interests (comma separated)
// // // //               </label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={profile.interests.join(", ")}
// // // //                 onChange={(e) =>
// // // //                   setProfile({
// // // //                     ...profile,
// // // //                     interests: e.target.value.split(",").map((i) => i.trim()),
// // // //                   })
// // // //                 }
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //                 placeholder="travel, music, sports"
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //               Bio
// // // //             </label>
// // // //             <textarea
// // // //               value={profile.bio}
// // // //               onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
// // // //               rows="4"
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //               placeholder="Tell us about yourself..."
// // // //             />
// // // //           </div>

// // // //           <button
// // // //             type="submit"
// // // //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
// // // //           >
// // // //             Save Profile
// // // //           </button>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from "react";
// // // import { supabase } from "../lib/supabase";
// // // import { Camera, X } from "lucide-react";
// // // import toast from "react-hot-toast";

// // // export default function Profile() {
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [uploading, setUploading] = useState(false);
// // //   const [profile, setProfile] = useState({
// // //     username: "",
// // //     bio: "",
// // //     age: "",
// // //     gender: "",
// // //     interests: [],
// // //     photos: [],
// // //   });

// // //   useEffect(() => {
// // //     getUserAndProfile();
// // //   }, []);

// // //   const getUserAndProfile = async () => {
// // //     try {
// // //       const {
// // //         data: { user },
// // //       } = await supabase.auth.getUser();
// // //       setUser(user);

// // //       if (user) {
// // //         await loadProfile(user.id);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // const loadProfile = async (userId) => {
// // //   //   try {
// // //   //     const { data, error } = await supabase
// // //   //       .from("profiles")
// // //   //       .select("*")
// // //   //       .eq("id", userId)
// // //   //       .maybeSingle();

// // //   //     if (error) throw error;

// // //   //     if (data) {
// // //   //       setProfile({
// // //   //         username: data.username || "",
// // //   //         bio: data.bio || "",
// // //   //         age: data.age || "",
// // //   //         gender: data.gender || "",
// // //   //         interests: data.interests || [],
// // //   //         photos: data.photos || [],
// // //   //       });
// // //   //     }
// // //   //   } catch (error) {
// // //   //     console.error("Error loading profile:", error);
// // //   //   }
// // //   // };

// // //   const loadProfile = async (userId) => {
// // //     try {
// // //       const { data, error } = await supabase
// // //         .from("profiles")
// // //         .select("*")
// // //         .eq("id", userId)
// // //         .maybeSingle();

// // //       if (error) throw error;

// // //       if (data) {
// // //         setProfile({
// // //           username: data.username || "",
// // //           bio: data.bio || "",
// // //           age: data.age || "",
// // //           gender: data.gender || "",
// // //           interests: data.interests || [],
// // //           photos: data.photos || [],
// // //         });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading profile:", error);
// // //     }
// // //   };

// // //   const uploadPhoto = async (event) => {
// // //     try {
// // //       setUploading(true);
// // //       const file = event.target.files[0];
// // //       if (!file) return;

// // //       const fileExt = file.name.split(".").pop();
// // //       const fileName = `${user.id}/${Date.now()}.${fileExt}`;
// // //       const filePath = fileName;

// // //       const { error: uploadError } = await supabase.storage
// // //         .from("photos")
// // //         .upload(filePath, file);

// // //       if (uploadError) throw uploadError;

// // //       const {
// // //         data: { publicUrl },
// // //       } = supabase.storage.from("photos").getPublicUrl(filePath);

// // //       // Create new photos array
// // //       const updatedPhotos = [...(profile.photos || []), publicUrl];

// // //       // Update profile with new photos array
// // //       const { error: updateError } = await supabase.from("profiles").upsert({
// // //         id: user.id,
// // //         photos: updatedPhotos,
// // //         updated_at: new Date(),
// // //       });

// // //       if (updateError) throw updateError;

// // //       setProfile({ ...profile, photos: updatedPhotos });
// // //       toast.success("Photo uploaded successfully!");
// // //     } catch (error) {
// // //       console.error("Upload error:", error);
// // //       toast.error("Error uploading photo: " + error.message);
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const removePhoto = async (photoUrl) => {
// // //     try {
// // //       const updatedPhotos = (profile.photos || []).filter(
// // //         (url) => url !== photoUrl,
// // //       );

// // //       const { error } = await supabase.from("profiles").upsert({
// // //         id: user.id,
// // //         photos: updatedPhotos,
// // //         updated_at: new Date(),
// // //       });

// // //       if (error) throw error;

// // //       setProfile({ ...profile, photos: updatedPhotos });
// // //       toast.success("Photo removed");
// // //     } catch (error) {
// // //       console.error("Remove error:", error);
// // //       toast.error("Error removing photo: " + error.message);
// // //     }
// // //   };

// // //   const updateProfile = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       // Validate age
// // //       const ageValue = profile.age ? parseInt(profile.age) : null;

// // //       // Process interests
// // //       const interestsArray = Array.isArray(profile.interests)
// // //         ? profile.interests
// // //         : [];

// // //       const profileData = {
// // //         id: user.id,
// // //         username: profile.username || null,
// // //         bio: profile.bio || null,
// // //         age: ageValue,
// // //         gender: profile.gender || null,
// // //         interests: interestsArray,
// // //         photos: profile.photos || [],
// // //         updated_at: new Date(),
// // //       };

// // //       const { error } = await supabase.from("profiles").upsert(profileData);

// // //       if (error) throw error;

// // //       toast.success("Profile updated successfully!");
// // //     } catch (error) {
// // //       console.error("Update error:", error);
// // //       toast.error("Error updating profile: " + error.message);
// // //     }
// // //   };

// // //   const handleInterestsChange = (e) => {
// // //     const value = e.target.value;
// // //     const interestsArray = value
// // //       .split(",")
// // //       .map((i) => i.trim())
// // //       .filter((i) => i !== "");
// // //     setProfile({ ...profile, interests: interestsArray });
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6">
// // //       <div className="bg-white rounded-2xl shadow-xl p-8">
// // //         <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

// // //         {/* Photos Section */}
// // //         <div className="mb-8">
// // //           <h3 className="text-lg font-semibold text-gray-700 mb-4">
// // //             Your Photos
// // //           </h3>
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //             {(profile.photos || []).map((photo, index) => (
// // //               <div key={index} className="relative group">
// // //                 <img
// // //                   src={photo}
// // //                   alt={`Profile ${index + 1}`}
// // //                   className="w-full h-40 object-cover rounded-lg"
// // //                 />
// // //                 <button
// // //                   onClick={() => removePhoto(photo)}
// // //                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
// // //                 >
// // //                   <X className="w-4 h-4" />
// // //                 </button>
// // //               </div>
// // //             ))}

// // //             {(profile.photos || []).length < 6 && (
// // //               <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition">
// // //                 <Camera className="w-8 h-8 text-gray-400" />
// // //                 <span className="text-sm text-gray-500 mt-2">
// // //                   {uploading ? "Uploading..." : "Add Photo"}
// // //                 </span>
// // //                 <input
// // //                   type="file"
// // //                   accept="image/*"
// // //                   onChange={uploadPhoto}
// // //                   disabled={uploading}
// // //                   className="hidden"
// // //                 />
// // //               </label>
// // //             )}
// // //           </div>
// // //           <p className="text-sm text-gray-500 mt-2">Add up to 6 photos</p>
// // //         </div>

// // //         {/* Profile Info Form */}
// // //         <form onSubmit={updateProfile} className="space-y-6">
// // //           <div className="grid md:grid-cols-2 gap-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Username
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 value={profile.username || ""}
// // //                 onChange={(e) =>
// // //                   setProfile({ ...profile, username: e.target.value })
// // //                 }
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // //                 required
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Age
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 min="18"
// // //                 max="100"
// // //                 value={profile.age || ""}
// // //                 onChange={(e) =>
// // //                   setProfile({ ...profile, age: e.target.value })
// // //                 }
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // //                 required
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Gender
// // //               </label>
// // //               <select
// // //                 value={profile.gender || ""}
// // //                 onChange={(e) =>
// // //                   setProfile({ ...profile, gender: e.target.value })
// // //                 }
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // //                 required
// // //               >
// // //                 <option value="">Select gender</option>
// // //                 <option value="male">Male</option>
// // //                 <option value="female">Female</option>
// // //                 <option value="other">Other</option>
// // //               </select>
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Interests (comma separated)
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 value={(profile.interests || []).join(", ")}
// // //                 onChange={handleInterestsChange}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // //                 placeholder="travel, music, sports"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Bio
// // //             </label>
// // //             <textarea
// // //               value={profile.bio || ""}
// // //               onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
// // //               rows="4"
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // //               placeholder="Tell us about yourself..."
// // //               required
// // //             />
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
// // //           >
// // //             Save Profile
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";
// // import { supabase } from "../lib/supabase";
// // import { useAuth } from "../context/AuthContext"; // Add this import
// // import { Camera, X } from "lucide-react";
// // import toast from "react-hot-toast";

// // export default function Profile() {
// //   const { user } = useAuth(); // Get user from custom auth - REPLACE supabase.auth.getUser()
// //   const [loading, setLoading] = useState(true);
// //   const [uploading, setUploading] = useState(false);
// //   const [profile, setProfile] = useState({
// //     username: "",
// //     bio: "",
// //     age: "",
// //     gender: "",
// //     interests: [],
// //     photos: [],
// //   });

// //   useEffect(() => {
// //     if (user) {
// //       loadProfile(user.id); // Use user.id from custom auth
// //     }
// //   }, [user]);

// //   const loadProfile = async (userId) => {
// //     try {
// //       const { data, error } = await supabase
// //         .from("profiles")
// //         .select("*")
// //         .eq("id", userId)
// //         .maybeSingle();

// //       if (error) throw error;

// //       if (data) {
// //         setProfile({
// //           username: data.username || "",
// //           bio: data.bio || "",
// //           age: data.age || "",
// //           gender: data.gender || "",
// //           interests: data.interests || [],
// //           photos: data.photos || [],
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error loading profile:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const uploadPhoto = async (event) => {
// //     try {
// //       setUploading(true);
// //       const file = event.target.files[0];
// //       if (!file) return;

// //       const fileExt = file.name.split(".").pop();
// //       const fileName = `${user.id}/${Date.now()}.${fileExt}`; // Use user.id
// //       const filePath = fileName;

// //       const { error: uploadError } = await supabase.storage
// //         .from("photos")
// //         .upload(filePath, file);

// //       if (uploadError) throw uploadError;

// //       const {
// //         data: { publicUrl },
// //       } = supabase.storage.from("photos").getPublicUrl(filePath);

// //       const updatedPhotos = [...(profile.photos || []), publicUrl];

// //       const { error: updateError } = await supabase.from("profiles").upsert({
// //         id: user.id, // Use user.id
// //         photos: updatedPhotos,
// //         updated_at: new Date(),
// //       });

// //       if (updateError) throw updateError;

// //       setProfile({ ...profile, photos: updatedPhotos });
// //       toast.success("Photo uploaded successfully!");
// //     } catch (error) {
// //       console.error("Upload error:", error);
// //       toast.error("Error uploading photo: " + error.message);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const removePhoto = async (photoUrl) => {
// //     try {
// //       const updatedPhotos = (profile.photos || []).filter(
// //         (url) => url !== photoUrl,
// //       );

// //       const { error } = await supabase.from("profiles").upsert({
// //         id: user.id, // Use user.id
// //         photos: updatedPhotos,
// //         updated_at: new Date(),
// //       });

// //       if (error) throw error;

// //       setProfile({ ...profile, photos: updatedPhotos });
// //       toast.success("Photo removed");
// //     } catch (error) {
// //       console.error("Remove error:", error);
// //       toast.error("Error removing photo: " + error.message);
// //     }
// //   };

// //   const updateProfile = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const ageValue = profile.age ? parseInt(profile.age) : null;

// //       const interestsArray = Array.isArray(profile.interests)
// //         ? profile.interests
// //         : [];

// //       const profileData = {
// //         id: user.id, // Use user.id
// //         username: profile.username || null,
// //         bio: profile.bio || null,
// //         age: ageValue,
// //         gender: profile.gender || null,
// //         interests: interestsArray,
// //         photos: profile.photos || [],
// //         updated_at: new Date(),
// //       };

// //       const { error } = await supabase.from("profiles").upsert(profileData);

// //       if (error) throw error;

// //       toast.success("Profile updated successfully!");
// //     } catch (error) {
// //       console.error("Update error:", error);
// //       toast.error("Error updating profile: " + error.message);
// //     }
// //   };

// //   const handleInterestsChange = (e) => {
// //     const value = e.target.value;
// //     const interestsArray = value
// //       .split(",")
// //       .map((i) => i.trim())
// //       .filter((i) => i !== "");
// //     setProfile({ ...profile, interests: interestsArray });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <div className="bg-white rounded-2xl shadow-xl p-8">
// //         <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

// //         {/* Photos Section */}
// //         <div className="mb-8">
// //           <h3 className="text-lg font-semibold text-gray-700 mb-4">
// //             Your Photos
// //           </h3>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             {(profile.photos || []).map((photo, index) => (
// //               <div key={index} className="relative group">
// //                 <img
// //                   src={photo}
// //                   alt={`Profile ${index + 1}`}
// //                   className="w-full h-40 object-cover rounded-lg"
// //                 />
// //                 <button
// //                   onClick={() => removePhoto(photo)}
// //                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
// //                 >
// //                   <X className="w-4 h-4" />
// //                 </button>
// //               </div>
// //             ))}

// //             {(profile.photos || []).length < 6 && (
// //               <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition">
// //                 <Camera className="w-8 h-8 text-gray-400" />
// //                 <span className="text-sm text-gray-500 mt-2">
// //                   {uploading ? "Uploading..." : "Add Photo"}
// //                 </span>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={uploadPhoto}
// //                   disabled={uploading}
// //                   className="hidden"
// //                 />
// //               </label>
// //             )}
// //           </div>
// //           <p className="text-sm text-gray-500 mt-2">Add up to 6 photos</p>
// //         </div>

// //         {/* Profile Info Form */}
// //         <form onSubmit={updateProfile} className="space-y-6">
// //           <div className="grid md:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Age
// //               </label>
// //               <input
// //                 type="number"
// //                 min="18"
// //                 max="100"
// //                 value={profile.age || ""}
// //                 onChange={(e) =>
// //                   setProfile({ ...profile, age: e.target.value })
// //                 }
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Gender
// //               </label>
// //               <select
// //                 value={profile.gender || ""}
// //                 onChange={(e) =>
// //                   setProfile({ ...profile, gender: e.target.value })
// //                 }
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                 required
// //               >
// //                 <option value="">Select gender</option>
// //                 <option value="male">Male</option>
// //                 <option value="female">Female</option>
// //                 <option value="other">Other</option>
// //               </select>
// //             </div>

// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Interests (comma separated)
// //               </label>
// //               <input
// //                 type="text"
// //                 value={(profile.interests || []).join(", ")}
// //                 onChange={handleInterestsChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                 placeholder="travel, music, sports"
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Bio
// //             </label>
// //             <textarea
// //               value={profile.bio || ""}
// //               onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
// //               rows="4"
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //               placeholder="Tell us about yourself..."
// //               required
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
// //           >
// //             Save Profile
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { supabase } from "../lib/supabase";
// import { useAuth } from "../context/AuthContext";
// import { Camera, X } from "lucide-react";
// import toast from "react-hot-toast";

// export default function Profile() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [profile, setProfile] = useState({
//     username: "",
//     bio: "",
//     age: "",
//     gender: "",
//     interests: [],
//     photos: [],
//   });

//   useEffect(() => {
//     if (user) {
//       loadProfile(user.id);
//     }
//   }, [user]);

//   const loadProfile = async (userId) => {
//     try {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", userId)
//         .maybeSingle();

//       if (error) throw error;

//       if (data) {
//         setProfile({
//           username: data.username || "",
//           bio: data.bio || "",
//           age: data.age || "",
//           gender: data.gender || "",
//           interests: data.interests || [],
//           photos: data.photos || [],
//         });
//       }
//     } catch (error) {
//       console.error("Error loading profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadPhoto = async (event) => {
//     try {
//       setUploading(true);
//       const file = event.target.files[0];
//       if (!file) return;

//       const fileExt = file.name.split(".").pop();
//       const fileName = `${user.id}/${Date.now()}.${fileExt}`;
//       const filePath = fileName;

//       const { error: uploadError } = await supabase.storage
//         .from("photos")
//         .upload(filePath, file);

//       if (uploadError) throw uploadError;

//       const {
//         data: { publicUrl },
//       } = supabase.storage.from("photos").getPublicUrl(filePath);

//       const updatedPhotos = [...(profile.photos || []), publicUrl];

//       const { error: updateError } = await supabase.from("profiles").upsert({
//         id: user.id,
//         photos: updatedPhotos,
//         updated_at: new Date(),
//       });

//       if (updateError) throw updateError;

//       setProfile({ ...profile, photos: updatedPhotos });
//       toast.success("Photo uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Error uploading photo: " + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removePhoto = async (photoUrl) => {
//     try {
//       const updatedPhotos = (profile.photos || []).filter(
//         (url) => url !== photoUrl,
//       );

//       const { error } = await supabase.from("profiles").upsert({
//         id: user.id,
//         photos: updatedPhotos,
//         updated_at: new Date(),
//       });

//       if (error) throw error;

//       setProfile({ ...profile, photos: updatedPhotos });
//       toast.success("Photo removed");
//     } catch (error) {
//       console.error("Remove error:", error);
//       toast.error("Error removing photo: " + error.message);
//     }
//   };

//   const updateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const ageValue = profile.age ? parseInt(profile.age) : null;

//       const interestsArray = Array.isArray(profile.interests)
//         ? profile.interests
//         : [];

//       const profileData = {
//         id: user.id,
//         username: profile.username || null,
//         bio: profile.bio || null,
//         age: ageValue,
//         gender: profile.gender || null,
//         interests: interestsArray,
//         photos: profile.photos || [],
//         updated_at: new Date(),
//       };

//       const { error } = await supabase.from("profiles").upsert(profileData);

//       if (error) throw error;

//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Error updating profile: " + error.message);
//     }
//   };

//   const handleInterestsChange = (e) => {
//     const value = e.target.value;
//     const interestsArray = value
//       .split(",")
//       .map((i) => i.trim())
//       .filter((i) => i !== "");
//     setProfile({ ...profile, interests: interestsArray });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             Your Photos
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {(profile.photos || []).map((photo, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={photo}
//                   alt={`Profile ${index + 1}`}
//                   className="w-full h-40 object-cover rounded-lg"
//                 />
//                 <button
//                   onClick={() => removePhoto(photo)}
//                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}

//             {(profile.photos || []).length < 6 && (
//               <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition">
//                 <Camera className="w-8 h-8 text-gray-400" />
//                 <span className="text-sm text-gray-500 mt-2">
//                   {uploading ? "Uploading..." : "Add Photo"}
//                 </span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={uploadPhoto}
//                   disabled={uploading}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>
//           <p className="text-sm text-gray-500 mt-2">Add up to 6 photos</p>
//         </div>

//         <form onSubmit={updateProfile} className="space-y-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 min="18"
//                 max="100"
//                 value={profile.age || ""}
//                 onChange={(e) =>
//                   setProfile({ ...profile, age: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Gender
//               </label>
//               <select
//                 value={profile.gender || ""}
//                 onChange={(e) =>
//                   setProfile({ ...profile, gender: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 required
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Interests (comma separated)
//               </label>
//               <input
//                 type="text"
//                 value={(profile.interests || []).join(", ")}
//                 onChange={handleInterestsChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 placeholder="travel, music, sports"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Bio
//             </label>
//             <textarea
//               value={profile.bio || ""}
//               onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
//               rows="4"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//               placeholder="Tell us about yourself..."
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
//           >
//             Save Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Camera, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    age: "",
    gender: "",
    interests: [],
    photos: [],
  });

  useEffect(() => {
    if (user) {
      loadProfile(user.id);
    }
  }, [user]);

  const loadProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          username: data.username || "",
          bio: data.bio || "",
          age: data.age || "",
          gender: data.gender || "",
          interests: data.interests || [],
          photos: data.photos || [],
        });
      } else {
        // If no profile exists, create one with the username from users table
        const { data: userData } = await supabase
          .from("users")
          .select("username")
          .eq("id", userId)
          .single();

        if (userData) {
          setProfile((prev) => ({ ...prev, username: userData.username }));
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("photos").getPublicUrl(filePath);

      const updatedPhotos = [...(profile.photos || []), publicUrl];

      // First, get the current profile to ensure we have all data
      const { data: currentProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // Prepare update data with ALL fields
      const updateData = {
        id: user.id,
        username: profile.username || currentProfile?.username || user.username,
        bio: profile.bio || currentProfile?.bio || null,
        age: profile.age ? parseInt(profile.age) : currentProfile?.age || null,
        gender: profile.gender || currentProfile?.gender || null,
        interests: profile.interests || currentProfile?.interests || [],
        photos: updatedPhotos,
        updated_at: new Date(),
      };

      const { error: updateError } = await supabase
        .from("profiles")
        .upsert(updateData);

      if (updateError) {
        console.error("Update error details:", updateError);
        throw updateError;
      }

      setProfile({ ...profile, photos: updatedPhotos });
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        "Error uploading photo: " + (error.message || JSON.stringify(error)),
      );
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = async (photoUrl) => {
    try {
      const updatedPhotos = (profile.photos || []).filter(
        (url) => url !== photoUrl,
      );

      // Get current profile data
      const { data: currentProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const updateData = {
        id: user.id,
        username: profile.username || currentProfile?.username || user.username,
        bio: profile.bio || currentProfile?.bio || null,
        age: profile.age ? parseInt(profile.age) : currentProfile?.age || null,
        gender: profile.gender || currentProfile?.gender || null,
        interests: profile.interests || currentProfile?.interests || [],
        photos: updatedPhotos,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updateData);

      if (error) throw error;

      setProfile({ ...profile, photos: updatedPhotos });
      toast.success("Photo removed");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Error removing photo: " + error.message);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const ageValue = profile.age ? parseInt(profile.age) : null;

      const interestsArray = Array.isArray(profile.interests)
        ? profile.interests
        : [];

      const profileData = {
        id: user.id,
        username: profile.username || user.username, // Ensure username is never null
        bio: profile.bio || null,
        age: ageValue,
        gender: profile.gender || null,
        interests: interestsArray,
        photos: profile.photos || [],
        updated_at: new Date(),
      };

      console.log("Updating profile with data:", profileData);

      const { error } = await supabase.from("profiles").upsert(profileData);

      if (error) {
        console.error("Update error:", error);
        throw error;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating profile: " + error.message);
    }
  };

  const handleInterestsChange = (e) => {
    const value = e.target.value;
    const interestsArray = value
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "");
    setProfile({ ...profile, interests: interestsArray });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
        {/* Display Username (read-only) */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {profile.username || user.username}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Username cannot be changed
          </p>
        </div>
        {/* Photos Section */}
        {/* <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Your Photos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(profile.photos || []).map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo}
                  alt={`Profile ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(photo)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {(profile.photos || []).length < 6 && (
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">
                  {uploading ? "Uploading..." : "Add Photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadPhoto}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">Add up to 6 photos</p>
        </div> */}
        // Replace the existing photos grid with this improved version
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Your Photos
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(profile.photos || []).map((photo, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={photo}
                  alt={`Profile ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=Photo+Error";
                  }}
                />
                <button
                  onClick={() => removePhoto(photo)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
              </div>
            ))}

            {(profile.photos || []).length < 6 && (
              <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all group">
                <Camera className="w-8 h-8 text-gray-400 group-hover:text-pink-500 transition-colors" />
                <span className="text-sm text-gray-500 mt-2 group-hover:text-pink-600">
                  {uploading ? "Uploading..." : "Add Photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadPhoto}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Add up to 6 photos. First photo will be your main profile picture.
          </p>
        </div>
        {/* Profile Info Form */}
        <form onSubmit={updateProfile} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                min="18"
                max="100"
                value={profile.age || ""}
                onChange={(e) =>
                  setProfile({ ...profile, age: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={profile.gender || ""}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interests (comma separated)
              </label>
              <input
                type="text"
                value={(profile.interests || []).join(", ")}
                onChange={handleInterestsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="travel, music, sports"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Tell us about yourself..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
