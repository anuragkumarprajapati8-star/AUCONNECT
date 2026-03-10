// // // // // import React, { useState } from "react";
// // // // // import { supabase } from "../lib/supabase";
// // // // // import toast from "react-hot-toast";
// // // // // import { Heart, Mail, Lock, User } from "lucide-react";

// // // // // export default function Auth() {
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [isLogin, setIsLogin] = useState(true);
// // // // //   const [formData, setFormData] = useState({
// // // // //     email: "",
// // // // //     password: "",
// // // // //     username: "",
// // // // //   });

// // // // //   const handleAuth = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       if (isLogin) {
// // // // //         const { error } = await supabase.auth.signInWithPassword({
// // // // //           email: formData.email,
// // // // //           password: formData.password,
// // // // //         });
// // // // //         if (error) throw error;
// // // // //         toast.success("Logged in successfully!");
// // // // //       } else {
// // // // //         const { error } = await supabase.auth.signUp({
// // // // //           email: formData.email,
// // // // //           password: formData.password,
// // // // //           options: {
// // // // //             data: {
// // // // //               username: formData.username,
// // // // //               avatar_url: null,
// // // // //             },
// // // // //           },
// // // // //         });
// // // // //         if (error) throw error;
// // // // //         toast.success(
// // // // //           "Registration successful! Please check your email for confirmation.",
// // // // //         );
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error(error.message);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen flex items-center justify-center p-4">
// // // // //       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
// // // // //         <div className="text-center mb-8">
// // // // //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
// // // // //             <Heart className="w-8 h-8 text-white" />
// // // // //           </div>
// // // // //           <h2 className="text-3xl font-bold text-gray-800">
// // // // //             {isLogin ? "Welcome Back!" : "Create Account"}
// // // // //           </h2>
// // // // //           <p className="text-gray-600 mt-2">
// // // // //             {isLogin ? "Sign in to continue" : "Sign up to start matching"}
// // // // //           </p>
// // // // //         </div>

// // // // //         <form onSubmit={handleAuth} className="space-y-4">
// // // // //           {!isLogin && (
// // // // //             <div>
// // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                 Username
// // // // //               </label>
// // // // //               <div className="relative">
// // // // //                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   required
// // // // //                   value={formData.username}
// // // // //                   onChange={(e) =>
// // // // //                     setFormData({ ...formData, username: e.target.value })
// // // // //                   }
// // // // //                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // // //                   placeholder="johndoe"
// // // // //                 />
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           <div>
// // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //               Email
// // // // //             </label>
// // // // //             <div className="relative">
// // // // //               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // //               <input
// // // // //                 type="email"
// // // // //                 required
// // // // //                 value={formData.email}
// // // // //                 onChange={(e) =>
// // // // //                   setFormData({ ...formData, email: e.target.value })
// // // // //                 }
// // // // //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // // //                 placeholder="you@example.com"
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           <div>
// // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //               Password
// // // // //             </label>
// // // // //             <div className="relative">
// // // // //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // //               <input
// // // // //                 type="password"
// // // // //                 required
// // // // //                 value={formData.password}
// // // // //                 onChange={(e) =>
// // // // //                   setFormData({ ...formData, password: e.target.value })
// // // // //                 }
// // // // //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // // //                 placeholder="••••••••"
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           <button
// // // // //             type="submit"
// // // // //             disabled={loading}
// // // // //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 disabled:opacity-50"
// // // // //           >
// // // // //             {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
// // // // //           </button>
// // // // //         </form>

// // // // //         <p className="text-center mt-6 text-gray-600">
// // // // //           {isLogin ? "Don't have an account? " : "Already have an account? "}
// // // // //           <button
// // // // //             onClick={() => setIsLogin(!isLogin)}
// // // // //             className="text-pink-600 hover:text-pink-700 font-semibold"
// // // // //           >
// // // // //             {isLogin ? "Sign Up" : "Sign In"}
// // // // //           </button>
// // // // //         </p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React, { useState } from "react";
// // // // import { supabase } from "../lib/supabase";
// // // // import toast from "react-hot-toast";
// // // // import { Heart, Mail, Lock, User } from "lucide-react";

// // // // export default function Auth() {
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [isLogin, setIsLogin] = useState(true);
// // // //   const [formData, setFormData] = useState({
// // // //     email: "",
// // // //     password: "",
// // // //     username: "",
// // // //   });

// // // //   const handleAuth = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     try {
// // // //       if (isLogin) {
// // // //         // LOGIN
// // // //         const { data, error } = await supabase.auth.signInWithPassword({
// // // //           email: formData.email,
// // // //           password: formData.password,
// // // //         });

// // // //         if (error) throw error;

// // // //         if (data.user) {
// // // //           toast.success("Logged in successfully!");
// // // //           // No need to check email confirmation since we disabled it
// // // //         }
// // // //       } else {
// // // //         // SIGN UP - with email verification disabled
// // // //         const { data, error } = await supabase.auth.signUp({
// // // //           email: formData.email,
// // // //           password: formData.password,
// // // //           options: {
// // // //             data: {
// // // //               username: formData.username,
// // // //             },
// // // //             // This ensures no email verification is sent
// // // //             emailRedirectTo: window.location.origin,
// // // //           },
// // // //         });

// // // //         if (error) throw error;

// // // //         if (data.user) {
// // // //           // Since email verification is disabled, user is immediately logged in
// // // //           toast.success("Registration successful! You are now logged in.");

// // // //           // Create initial profile entry
// // // //           await createInitialProfile(data.user.id, formData.username);
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Auth error:", error);
// // // //       toast.error(error.message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const createInitialProfile = async (userId, username) => {
// // // //     try {
// // // //       const { error } = await supabase.from("profiles").insert({
// // // //         id: userId,
// // // //         username: username,
// // // //         photos: [],
// // // //         interests: [],
// // // //         created_at: new Date(),
// // // //       });

// // // //       if (error && error.code !== "23505") {
// // // //         // Ignore duplicate key errors
// // // //         console.error("Error creating profile:", error);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Profile creation error:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center p-4">
// // // //       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
// // // //         <div className="text-center mb-8">
// // // //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
// // // //             <Heart className="w-8 h-8 text-white" />
// // // //           </div>
// // // //           <h2 className="text-3xl font-bold text-gray-800">
// // // //             {isLogin ? "Welcome Back!" : "Create Account"}
// // // //           </h2>
// // // //           <p className="text-gray-600 mt-2">
// // // //             {isLogin ? "Sign in to continue" : "Sign up to start matching"}
// // // //           </p>
// // // //           {!isLogin && (
// // // //             <p className="text-sm text-green-600 mt-2">
// // // //               ✨ No email verification required - instant access!
// // // //             </p>
// // // //           )}
// // // //         </div>

// // // //         <form onSubmit={handleAuth} className="space-y-4">
// // // //           {!isLogin && (
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Username
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //                 <input
// // // //                   type="text"
// // // //                   required
// // // //                   value={formData.username}
// // // //                   onChange={(e) =>
// // // //                     setFormData({ ...formData, username: e.target.value })
// // // //                   }
// // // //                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //                   placeholder="johndoe"
// // // //                   minLength={3}
// // // //                 />
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //               Email
// // // //             </label>
// // // //             <div className="relative">
// // // //               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //               <input
// // // //                 type="email"
// // // //                 required
// // // //                 value={formData.email}
// // // //                 onChange={(e) =>
// // // //                   setFormData({ ...formData, email: e.target.value })
// // // //                 }
// // // //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //                 placeholder="you@example.com"
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //               Password
// // // //             </label>
// // // //             <div className="relative">
// // // //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //               <input
// // // //                 type="password"
// // // //                 required
// // // //                 value={formData.password}
// // // //                 onChange={(e) =>
// // // //                   setFormData({ ...formData, password: e.target.value })
// // // //                 }
// // // //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // // //                 placeholder="••••••••"
// // // //                 minLength={6}
// // // //               />
// // // //             </div>
// // // //             {!isLogin && (
// // // //               <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
// // // //             )}
// // // //           </div>

// // // //           <button
// // // //             type="submit"
// // // //             disabled={loading}
// // // //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 disabled:opacity-50"
// // // //           >
// // // //             {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
// // // //           </button>
// // // //         </form>

// // // //         <p className="text-center mt-6 text-gray-600">
// // // //           {isLogin ? "Don't have an account? " : "Already have an account? "}
// // // //           <button
// // // //             onClick={() => setIsLogin(!isLogin)}
// // // //             className="text-pink-600 hover:text-pink-700 font-semibold"
// // // //           >
// // // //             {isLogin ? "Sign Up" : "Sign In"}
// // // //           </button>
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState } from "react";
// // // import { supabase } from "../lib/supabase";
// // // import toast from "react-hot-toast";
// // // import { Heart, Lock, User } from "lucide-react";

// // // export default function Auth() {
// // //   const [loading, setLoading] = useState(false);
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     password: "",
// // //   });

// // //   // Generate a dummy email for Supabase auth
// // //   const generateDummyEmail = (username) => {
// // //     return `${username}@matchme.local`.toLowerCase();
// // //   };

// // //   const handleAuth = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       if (isLogin) {
// // //         // LOGIN - Find user by username first
// // //         const { data: profile, error: profileError } = await supabase
// // //           .from("profiles")
// // //           .select("id")
// // //           .eq("username", formData.username)
// // //           .single();

// // //         if (profileError || !profile) {
// // //           throw new Error("Username not found");
// // //         }

// // //         // Get the user's email from auth.users (we stored it as username@matchme.local)
// // //         const dummyEmail = generateDummyEmail(formData.username);

// // //         const { data, error } = await supabase.auth.signInWithPassword({
// // //           email: dummyEmail,
// // //           password: formData.password,
// // //         });

// // //         if (error) throw error;

// // //         toast.success(`Welcome back, ${formData.username}!`);
// // //       } else {
// // //         // SIGN UP - Check if username already exists
// // //         const { data: existingUser, error: checkError } = await supabase
// // //           .from("profiles")
// // //           .select("username")
// // //           .eq("username", formData.username)
// // //           .maybeSingle();

// // //         if (existingUser) {
// // //           throw new Error("Username already taken");
// // //         }

// // //         // Create auth user with dummy email
// // //         const dummyEmail = generateDummyEmail(formData.username);

// // //         const { data: authData, error: authError } = await supabase.auth.signUp(
// // //           {
// // //             email: dummyEmail,
// // //             password: formData.password,
// // //             options: {
// // //               data: {
// // //                 username: formData.username,
// // //               },
// // //             },
// // //           },
// // //         );

// // //         if (authError) throw authError;

// // //         if (authData.user) {
// // //           // Create profile with username
// // //           const { error: profileError } = await supabase
// // //             .from("profiles")
// // //             .insert({
// // //               id: authData.user.id,
// // //               username: formData.username,
// // //               photos: [],
// // //               interests: [],
// // //               created_at: new Date(),
// // //             });

// // //           if (profileError) {
// // //             console.error("Profile creation error:", profileError);
// // //             // If profile creation fails, we should clean up the auth user
// // //             await supabase.auth.admin.deleteUser(authData.user.id);
// // //             throw new Error("Failed to create profile");
// // //           }

// // //           toast.success("Account created successfully!");
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Auth error:", error);
// // //       toast.error(error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center p-4">
// // //       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
// // //         <div className="text-center mb-8">
// // //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
// // //             <Heart className="w-8 h-8 text-white" />
// // //           </div>
// // //           <h2 className="text-3xl font-bold text-gray-800">
// // //             {isLogin ? "Welcome Back!" : "Create Account"}
// // //           </h2>
// // //           <p className="text-gray-600 mt-2">
// // //             {isLogin
// // //               ? "Sign in with your username"
// // //               : "Choose a username to start"}
// // //           </p>
// // //           {!isLogin && (
// // //             <p className="text-sm text-green-600 mt-2 font-medium">
// // //               ✨ No email needed - just username & password!
// // //             </p>
// // //           )}
// // //         </div>

// // //         <form onSubmit={handleAuth} className="space-y-4">
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Username
// // //             </label>
// // //             <div className="relative">
// // //               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //               <input
// // //                 type="text"
// // //                 required
// // //                 value={formData.username}
// // //                 onChange={(e) =>
// // //                   setFormData({ ...formData, username: e.target.value.trim() })
// // //                 }
// // //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // //                 placeholder="johndoe"
// // //                 minLength={3}
// // //                 maxLength={20}
// // //                 pattern="[a-zA-Z0-9_]+"
// // //                 title="Username can only contain letters, numbers, and underscores"
// // //               />
// // //             </div>
// // //             {!isLogin && (
// // //               <p className="text-xs text-gray-500 mt-1">
// // //                 3-20 characters, letters, numbers, and underscores only
// // //               </p>
// // //             )}
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Password
// // //             </label>
// // //             <div className="relative">
// // //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //               <input
// // //                 type="password"
// // //                 required
// // //                 value={formData.password}
// // //                 onChange={(e) =>
// // //                   setFormData({ ...formData, password: e.target.value })
// // //                 }
// // //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// // //                 placeholder="••••••••"
// // //                 minLength={6}
// // //               />
// // //             </div>
// // //             {!isLogin && (
// // //               <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
// // //             )}
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 disabled:opacity-50"
// // //           >
// // //             {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
// // //           </button>
// // //         </form>

// // //         <p className="text-center mt-6 text-gray-600">
// // //           {isLogin ? "Don't have an account? " : "Already have an account? "}
// // //           <button
// // //             onClick={() => setIsLogin(!isLogin)}
// // //             className="text-pink-600 hover:text-pink-700 font-semibold"
// // //           >
// // //             {isLogin ? "Sign Up" : "Sign In"}
// // //           </button>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import { Heart, Lock, User } from "lucide-react";

// // export default function Auth() {
// //   const [loading, setLoading] = useState(false);
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     password: "",
// //   });

// //   const { signIn, signUp } = useAuth();
// //   const navigate = useNavigate();

// //   const handleAuth = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       let result;

// //       if (isLogin) {
// //         result = await signIn(formData.username, formData.password);
// //         if (result.error) throw new Error(result.error);
// //         toast.success(`Welcome back, ${formData.username}!`);
// //       } else {
// //         // Validate username format
// //         if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
// //           throw new Error(
// //             "Username must be 3-20 characters and can only contain letters, numbers, and underscores",
// //           );
// //         }

// //         if (formData.password.length < 6) {
// //           throw new Error("Password must be at least 6 characters");
// //         }

// //         result = await signUp(formData.username, formData.password);
// //         if (result.error) throw new Error(result.error);
// //         toast.success("Account created successfully!");
// //       }

// //       navigate("/");
// //     } catch (error) {
// //       console.error("Auth error:", error);
// //       toast.error(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
// //         <div className="text-center mb-8">
// //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
// //             <Heart className="w-8 h-8 text-white" />
// //           </div>
// //           <h2 className="text-3xl font-bold text-gray-800">
// //             {isLogin ? "Welcome Back!" : "Create Account"}
// //           </h2>
// //           <p className="text-gray-600 mt-2">
// //             {isLogin
// //               ? "Sign in with your username"
// //               : "Choose a username to start"}
// //           </p>
// //           <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
// //             <p className="text-sm text-green-700 font-medium">
// //               ✨ No email needed - just username & password!
// //             </p>
// //             <p className="text-xs text-green-600 mt-1">
// //               No rate limits, no verification, instant access
// //             </p>
// //           </div>
// //         </div>

// //         <form onSubmit={handleAuth} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Username
// //             </label>
// //             <div className="relative">
// //               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.username}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, username: e.target.value.trim() })
// //                 }
// //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                 placeholder="johndoe"
// //                 minLength={3}
// //                 maxLength={20}
// //                 pattern="[a-zA-Z0-9_]+"
// //                 title="Username can only contain letters, numbers, and underscores"
// //                 disabled={loading}
// //               />
// //             </div>
// //             {!isLogin && (
// //               <p className="text-xs text-gray-500 mt-1">
// //                 3-20 characters, letters, numbers, and underscores only
// //               </p>
// //             )}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="password"
// //                 required
// //                 value={formData.password}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, password: e.target.value })
// //                 }
// //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                 placeholder="••••••••"
// //                 minLength={6}
// //                 disabled={loading}
// //               />
// //             </div>
// //             {!isLogin && (
// //               <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
// //             )}
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 disabled:opacity-50"
// //           >
// //             {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
// //           </button>
// //         </form>

// //         <p className="text-center mt-6 text-gray-600">
// //           {isLogin ? "Don't have an account? " : "Already have an account? "}
// //           <button
// //             onClick={() => setIsLogin(!isLogin)}
// //             className="text-pink-600 hover:text-pink-700 font-semibold"
// //             disabled={loading}
// //           >
// //             {isLogin ? "Sign Up" : "Sign In"}
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Heart, Lock, User } from "lucide-react";

// export default function Auth() {
//   const [loading, setLoading] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const { signIn, signUp } = useAuth();
//   const navigate = useNavigate();

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let result;

//       if (isLogin) {
//         result = await signIn(formData.username, formData.password);
//         if (result.error) throw new Error(result.error);
//         toast.success(`Welcome back, ${formData.username}!`);
//       } else {
//         if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
//           throw new Error(
//             "Username must be 3-20 characters and can only contain letters, numbers, and underscores",
//           );
//         }

//         if (formData.password.length < 6) {
//           throw new Error("Password must be at least 6 characters");
//         }

//         result = await signUp(formData.username, formData.password);
//         if (result.error) throw new Error(result.error);
//         toast.success("Account created successfully!");
//       }

//       navigate("/");
//     } catch (error) {
//       console.error("Auth error:", error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
//             <Heart className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800">
//             {isLogin ? "Welcome Back!" : "Create Account"}
//           </h2>
//           <p className="text-gray-600 mt-2">
//             {isLogin
//               ? "Sign in with your username"
//               : "Choose a username to start"}
//           </p>
//           <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-sm text-green-700 font-medium">
//               ✨ No email needed - just username & password!
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleAuth} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 required
//                 value={formData.username}
//                 onChange={(e) =>
//                   setFormData({ ...formData, username: e.target.value.trim() })
//                 }
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 placeholder="johndoe"
//                 minLength={3}
//                 maxLength={20}
//                 pattern="[a-zA-Z0-9_]+"
//                 title="Username can only contain letters, numbers, and underscores"
//                 disabled={loading}
//               />
//             </div>
//             {!isLogin && (
//               <p className="text-xs text-gray-500 mt-1">
//                 3-20 characters, letters, numbers, and underscores only
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 placeholder="••••••••"
//                 minLength={6}
//                 disabled={loading}
//               />
//             </div>
//             {!isLogin && (
//               <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
//           </button>
//         </form>

//         <p className="text-center mt-6 text-gray-600">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-pink-600 hover:text-pink-700 font-semibold"
//             disabled={loading}
//           >
//             {isLogin ? "Sign Up" : "Sign In"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Heart, Lock, User, Sparkles, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;

      if (isLogin) {
        result = await signIn(formData.username, formData.password);
        if (result.error) throw new Error(result.error);
        toast.success(`Welcome back, ${formData.username}!`);
      } else {
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
          throw new Error(
            "Username must be 3-20 characters and can only contain letters, numbers, and underscores",
          );
        }

        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        result = await signUp(formData.username, formData.password);
        if (result.error) throw new Error(result.error);
        toast.success("Account created successfully!");
      }

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Logo className="justify-center" />
        </motion.div>

        {/* Auth Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <Heart className="w-12 h-12 text-pink-500" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mt-4">
                  {isLogin ? "Welcome Back!" : "Join AUCONNECT"}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isLogin
                    ? "Sign in to continue your journey"
                    : "Start your connection journey today"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          username: e.target.value.trim(),
                        })
                      }
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all bg-white/50 backdrop-blur-sm"
                      placeholder="johndoe"
                      minLength={3}
                      maxLength={20}
                      pattern="[a-zA-Z0-9_]+"
                      disabled={loading}
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors w-5 h-5" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all bg-white/50 backdrop-blur-sm"
                      placeholder="••••••••"
                      minLength={6}
                      disabled={loading}
                    />
                  </div>
                </motion.div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100"
                  >
                    <div className="flex items-center space-x-2 text-sm text-purple-700">
                      <Sparkles className="w-4 h-4" />
                      <span>No email needed - just username & password!</span>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        {isLogin ? "Sign In" : "Create Account"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.button>
              </form>

              <p className="text-center mt-6 text-gray-600">
                {isLogin ? "New to AUCONNECT? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-pink-600 hover:text-pink-700 font-semibold hover:underline transition-all"
                  disabled={loading}
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-6 -right-6 w-12 h-12 bg-pink-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-400 rounded-full opacity-20"
        />
      </motion.div>
    </div>
  );
}
