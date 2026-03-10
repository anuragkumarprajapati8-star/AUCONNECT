import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">AU</span>
        </div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur opacity-30"
        />
      </motion.div>
      <div className="flex flex-col">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
        >
          AUCONNECT
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] text-gray-500 -mt-1"
        >
          Where connections begin
        </motion.span>
      </div>
    </Link>
  );
}
