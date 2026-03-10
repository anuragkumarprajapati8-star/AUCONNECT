// // // import React from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { supabase } from "../lib/supabase";
// // // import { Heart, User, MessageCircle, LogOut } from "lucide-react";
// // // import toast from "react-hot-toast";

// // // export default function Navbar() {
// // //   const navigate = useNavigate();

// // //   const handleLogout = async () => {
// // //     try {
// // //       const { error } = await supabase.auth.signOut();
// // //       if (error) throw error;
// // //       toast.success("Logged out successfully");
// // //       navigate("/auth");
// // //     } catch (error) {
// // //       toast.error(error.message);
// // //     }
// // //   };

// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import { Heart, User, MessageCircle, LogOut } from "lucide-react";
// // import toast from "react-hot-toast";

// // export default function Navbar() {
// //   const navigate = useNavigate();
// //   const { signOut } = useAuth();

// //   const handleLogout = () => {
// //     signOut();
// //     toast.success("Logged out successfully");
// //     navigate("/auth");
// //   };

// //   // ... rest of your existing Navbar code

// //   return (
// //     <nav className="bg-white shadow-lg sticky top-0 z-50">
// //       <div className="max-w-6xl mx-auto px-4">
// //         <div className="flex justify-between items-center h-16">
// //           <Link to="/" className="flex items-center space-x-2">
// //             <Heart className="w-8 h-8 text-pink-500 fill-current" />
// //             <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
// //               MatchMe
// //             </span>
// //           </Link>

// //           <div className="flex space-x-4">
// //             <Link
// //               to="/"
// //               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-pink-50 transition"
// //             >
// //               <Heart className="w-5 h-5 text-pink-500" />
// //               <span className="text-gray-700">Discover</span>
// //             </Link>

// //             <Link
// //               to="/matches"
// //               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-pink-50 transition"
// //             >
// //               <MessageCircle className="w-5 h-5 text-pink-500" />
// //               <span className="text-gray-700">Matches</span>
// //             </Link>

// //             <Link
// //               to="/profile"
// //               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-pink-50 transition"
// //             >
// //               <User className="w-5 h-5 text-pink-500" />
// //               <span className="text-gray-700">Profile</span>
// //             </Link>

// //             <button
// //               onClick={handleLogout}
// //               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-red-50 transition"
// //             >
// //               <LogOut className="w-5 h-5 text-red-500" />
// //               <span className="text-gray-700">Logout</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Heart, User, MessageCircle, LogOut } from "lucide-react";
// import toast from "react-hot-toast";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { signOut } = useAuth();

//   const handleLogout = () => {
//     signOut();
//     toast.success("Logged out successfully");
//     navigate("/auth");
//   };

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <Heart className="w-8 h-8 text-pink-500 fill-current" />
//             <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
//               MatchMe
//             </span>
//           </Link>

//           <div className="flex space-x-4">
//             <Link
//               to="/"
//               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-pink-50 transition"
//             >
//               <Heart className="w-5 h-5 text-pink-500" />
//               <span className="text-gray-700">Discover</span>
//             </Link>

//             <Link
//               to="/matches"
//               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-pink-50 transition"
//             >
//               <MessageCircle className="w-5 h-5 text-pink-500" />
//               <span className="text-gray-700">Matches</span>
//             </Link>

//             <Link
//               to="/profile"
//               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-pink-50 transition"
//             >
//               <User className="w-5 h-5 text-pink-500" />
//               <span className="text-gray-700">Profile</span>
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-red-50 transition"
//             >
//               <LogOut className="w-5 h-5 text-red-500" />
//               <span className="text-gray-700">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, User, MessageCircle, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "./Logo";

export default function Navbar() {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
  };

  const navItems = [
    { path: "/", label: "Discover", icon: Heart },
    { path: "/matches", label: "Matches", icon: MessageCircle },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg"
            : "bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "text-pink-600 bg-pink-50"
                          : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="p-6">
                <Logo className="mb-8" />

                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                              : "text-gray-600 hover:bg-pink-50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}

                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all mt-4"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
