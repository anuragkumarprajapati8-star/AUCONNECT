// // import React, { useState, useEffect } from "react";
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Navigate,
// // } from "react-router-dom";
// // import { Toaster } from "react-hot-toast";
// // import { supabase } from "./lib/supabase";
// // import Auth from "./components/Auth";
// // import Navbar from "./components/Navbar";
// // import Profile from "./components/Profile";
// // import SwipeCards from "./components/SwipeCards";
// // import Matches from "./components/Matches";
// // import MessageNotification from "./components/MessageNotification";

// // function App() {
// //   const [session, setSession] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     supabase.auth.getSession().then(({ data: { session } }) => {
// //       setSession(session);
// //       setLoading(false);
// //     });

// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange((_event, session) => {
// //       setSession(session);
// //     });

// //     return () => subscription.unsubscribe();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <Router>
// //       <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100">
// //         <Toaster position="top-center" />
// //         <MessageNotification />
// //         {session ? (
// //           <>
// //             <Navbar />
// //             <Routes>
// //               <Route path="/" element={<SwipeCards />} />
// //               <Route path="/profile" element={<Profile />} />
// //               <Route path="/matches" element={<Matches />} />
// //               <Route path="*" element={<Navigate to="/" />} />
// //             </Routes>
// //           </>
// //         ) : (
// //           <Routes>
// //             <Route path="/auth" element={<Auth />} />
// //             <Route path="*" element={<Navigate to="/auth" />} />
// //           </Routes>
// //         )}
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Auth from "./components/Auth";
// import Navbar from "./components/Navbar";
// import Profile from "./components/Profile";
// import SwipeCards from "./components/SwipeCards";
// import Matches from "./components/Matches";

// function AppContent() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100">
//       <Toaster position="top-center" />
//       {user ? (
//         <>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<SwipeCards />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/matches" element={<Matches />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </>
//       ) : (
//         <Routes>
//           <Route path="/auth" element={<Auth />} />
//           <Route path="*" element={<Navigate to="/auth" />} />
//         </Routes>
//       )}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SwipeCards from "./components/SwipeCards";
import Matches from "./components/Matches";
import LoadingSpinner from "./components/LoadingSpinner";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#764ba2",
            },
          },
        }}
      />
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="authenticated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<SwipeCards />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </motion.div>
        ) : (
          <motion.div
            key="unauthenticated"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
