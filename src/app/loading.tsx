"use client";

import { motion } from "framer-motion";
import { Pill } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Pill className="h-16 w-16 text-primary" />
        </motion.div>
        <p className="mt-4 text-sm font-semibold tracking-widest text-primary uppercase animate-pulse">
          MediStore Loading...
        </p>
      </motion.div>
    </div>
  );
}
