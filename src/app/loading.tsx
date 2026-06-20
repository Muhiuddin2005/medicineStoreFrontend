"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial-[circle_at_center] from-neutral-950 via-neutral-900 to-black">
      {/* Background glow effects */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] animate-pulse" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-blue-500/5 blur-[90px] animate-pulse delay-500" />

      <div className="relative flex flex-col items-center">
        {/* Futuristic glowing pill assembling animation */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          {/* Outer glowing orbiting circle */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-primary/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-t border-b border-primary/60 border-l-transparent border-r-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner pill assembly animation */}
          <div className="relative flex gap-1 transform rotate-45">
            {/* Left cap */}
            <motion.div 
              className="w-4 h-10 bg-primary rounded-t-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Right cap */}
            <motion.div 
              className="w-4 h-10 bg-teal-400 rounded-b-full shadow-[0_0_15px_rgba(45,212,191,0.6)]"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Text loader */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2 
            className="text-lg font-black tracking-widest bg-gradient-to-r from-primary via-teal-400 to-blue-500 bg-clip-text text-transparent uppercase"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% auto" }}
          >
            MediStore
          </motion.h2>
          <span className="text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase animate-pulse">
            Synthesizing Experience...
          </span>
        </div>
      </div>
    </div>
  );
}
